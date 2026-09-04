import {
  buildPersonalSettingsPayload,
  decodePersonalSettings,
  GwtDispatchError,
  PERSONAL_SETTINGS_ACTION,
} from './protocol'
import type { BuildInfo, GwtPersonalSettingsClientOptions, PersonalSettings } from './types'

const USER_UUID_PATTERN = /^[A-Za-z][\w-]*\$[\w-]+$/

/**
 * Получает конфигурацию темы NSMP по её коду.
 *
 * @param themeCode Код темы, передаваемый в параметре `theme`.
 * @returns Строковое содержимое конфигурации темы.
 * @throws {TypeError} Если код темы пустой.
 * @throws {GwtDispatchError} Если сервер вернул неуспешный HTTP-статус.
 */
export const getThemeConfigurationByCode = async (themeCode: string): Promise<string> => {
  if (!themeCode.trim()) throw new TypeError('Код темы не должен быть пустым')

  const params = new URLSearchParams({
    id: 'common',
    method: 'theme',
    theme: themeCode,
  })
  const response = await window.fetch(`/sd/jspresource?${params.toString()}`, {
    method: 'GET',
  })
  const body = await response.text()

  if (!response.ok) { throw new GwtDispatchError(`Не удалось получить конфигурацию темы: HTTP ${response.status}`, body)}

  return body
}

/** Загружает текстовый ресурс текущей NSMP-сессии. */
const fetchText = async (url: string): Promise<string> => {
  const response = await window.fetch(url, { credentials: 'include' })
  const body = await response.text()
  if (!response.ok) { throw new GwtDispatchError(`Не удалось загрузить ${url}: HTTP ${response.status}`, body)}
  return body
}

/** Экранирует строку для безопасного использования внутри регулярного выражения. */
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Загружает policy hash и определяет сигнатуру action персональных настроек. */
const loadBuildInfo = async (
  moduleBase: string,
  options: GwtPersonalSettingsClientOptions,
): Promise<BuildInfo> => {
  const policySource = options.policyHash ?? await fetchText(`${moduleBase}police.txt`)
  const policyHash = policySource.match(/[0-9A-F]{32}/i)?.[0]
  if (!policyHash) {
    throw new GwtDispatchError(`Не удалось извлечь policy hash из ответа: ${JSON.stringify(policySource)}`)
  }

  if (options.actionSignature) {
    return { policyHash, actionSignature: options.actionSignature }
  }

  const policy = await fetchText(`${moduleBase}${policyHash}.gwt.rpc`)
  const escapedAction = escapeRegExp(PERSONAL_SETTINGS_ACTION)
  const actionSignature = policy.match(new RegExp(`${escapedAction}/(\\d+)`))?.[1]
  if (!actionSignature) {
    throw new GwtDispatchError(`Action ${PERSONAL_SETTINGS_ACTION} отсутствует в policy ${policyHash}`)
  }

  return { policyHash, actionSignature }
}

/** Безопасно возвращает документ родительского окна при доступном same-origin доступе. */
const getParentDocument = (): Document | undefined => {
  try {
    return window.parent.document
  } catch {
    return undefined
  }
}

/** Ищет CSRF-токен NSMP в текущем и родительском документах. */
const findCsrfToken = (): string | undefined => {
  for (const documentObject of [document, getParentDocument()]) {
    const token = documentObject?.querySelector<HTMLMetaElement>('meta[name="_csrf"]')?.content
    if (token) return token
  }
  return undefined
}

/** Клиент получения персональных настроек пользователя через GWT Dispatch NSMP. */
export class GwtPersonalSettingsClient {
  private buildInfo?: Promise<BuildInfo>

  /** Создаёт клиент и сохраняет параметры подключения. */
  constructor(private readonly options: GwtPersonalSettingsClientOptions = {}) {}

  /**
   * Получает тему операторского интерфейса пользователя.
   *
   * @param userUuid UUID пользователя NSMP, например `employee$123`.
   * @returns Код темы или `null`, если тема не задана.
   */
  async getThemeOperator(userUuid: string): Promise<string | null> {
    return (await this.getPersonalSettings(userUuid)).themeOperator
  }

  /**
   * Получает все персональные настройки пользователя через GWT Dispatch.
   *
   * @param userUuid UUID пользователя NSMP, например `employee$123`.
   * @returns Десериализованные персональные настройки.
   * @throws {TypeError} Если UUID имеет некорректный формат.
   * @throws {GwtDispatchError} Если запрос или декодирование ответа завершились ошибкой.
   */
  async getPersonalSettings(userUuid: string): Promise<PersonalSettings> {
    if (!USER_UUID_PATTERN.test(userUuid)) {
      throw new TypeError(`Некорректный UUID пользователя: ${userUuid}`)
    }

    const moduleBase = new URL(
      this.options.modulePath ?? '/sd/admin/',
      this.options.baseUrl ?? window.location.origin,
    ).href
    const build = await this.getBuildInfo(moduleBase)
    const csrfToken = this.options.csrfToken ?? findCsrfToken()
    if (!csrfToken) throw new GwtDispatchError('Не найден CSRF-токен текущей сессии')

    const response = await window.fetch(`${moduleBase}dispatch`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
        'X-GWT-Module-Base': moduleBase,
        'X-GWT-Permutation': this.options.permutation ?? build.policyHash,
        'X-CSRF-TOKEN': csrfToken,
      },
      body: buildPersonalSettingsPayload(
        moduleBase,
        build.policyHash,
        build.actionSignature,
        userUuid,
      ),
    })

    const body = await response.text()
    if (!response.ok || !body.startsWith('//OK')) {
      throw new GwtDispatchError(`Ошибка GWT Dispatch: HTTP ${response.status}`, body)
    }
    return decodePersonalSettings(body)
  }

  /** Загружает данные GWT-сборки один раз и кеширует выполняющийся Promise. */
  private getBuildInfo(moduleBase: string): Promise<BuildInfo> {
    return (this.buildInfo ??= loadBuildInfo(moduleBase, this.options))
  }
}
