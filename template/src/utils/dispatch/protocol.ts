import type { PersonalSettings } from './types'

const GWT_SERVICE = 'net.customware.gwt.dispatch.shared.standard.StandardDispatchService'
const GWT_ACTION_INTERFACE = 'net.customware.gwt.dispatch.shared.Action'
export const PERSONAL_SETTINGS_ACTION = 'ru.naumen.core.shared.dispatch.GetUserPersonalSettingsAction'
const PERSONAL_SETTINGS_RESPONSE = 'ru.naumen.core.shared.dispatch.GetUserPersonalSettingsResponse'
const PERSONAL_SETTINGS_DTO = 'ru.naumen.core.shared.personalsettings.PersonalSettingsDTO'

/** Ошибка HTTP-запроса или обработки протокола GWT Dispatch. */
export class GwtDispatchError extends Error {
  /**
   * Создаёт ошибку GWT Dispatch и сохраняет исходное тело ответа для диагностики.
   *
   * @param message Понятное описание ошибки.
   * @param responseBody Необработанное тело ответа NSMP, если оно доступно.
   */
  constructor(message: string, readonly responseBody?: string) {
    super(message)
    this.name = 'GwtDispatchError'
  }
}

/** Формирует сериализованный GWT-RPC payload для указанного action. */
export const buildDispatchPayload = (
  moduleBase: string,
  policyHash: string,
  actionSignature: string,
  action: string,
  userUuid: string,
): string => {
  const strings = [
    moduleBase,
    policyHash,
    GWT_SERVICE,
    'execute',
    GWT_ACTION_INTERFACE,
    `${action}/${actionSignature}`,
    userUuid,
  ]
  return ['7', '0', '7', ...strings, '1', '2', '3', '4', '1', '5', '6', '7', ''].join('|')
}

/** Читает значения GWT-RPC в обратном порядке и разрешает ссылки на объекты. */
class GwtReader {
  private position: number
  private readonly references: unknown[] = []

  /** Создаёт reader для секции значений и таблицы строк GWT-пакета. */
  constructor(
    private readonly values: unknown[],
    private readonly strings: string[],
  ) {
    this.position = values.length - 1
  }

  /** Добавляет десериализованный объект в таблицу ссылок GWT. */
  addReference(value: unknown): void {
    this.references.push(value)
  }

  /** Проверяет, что следующее строковое значение содержит ожидаемый GWT-тип. */
  expectType(expected: string): void {
    const actual = this.string()
    if (!actual?.startsWith(`${expected}/`)) {
      throw new GwtDispatchError(`Ожидался GWT-тип ${expected}, получен ${actual}`)
    }
  }

  /** Читает nullable-строку из таблицы строк GWT. */
  string(): string | null {
    const token = this.integer()
    if (token === 0) return null
    if (token < 0) throw new GwtDispatchError('Ожидалась строка')
    return this.strings[token - 1] ?? null
  }

  /** Читает примитивное логическое значение GWT. */
  boolean(): boolean {
    return this.integer() === 1
  }

  /** Читает nullable-значение `java.lang.Boolean` или ссылку на него. */
  boxedBoolean(): boolean | null {
    const token = this.integer()
    if (token === 0) return null
    if (token < 0) return this.reference(token, 'boolean') as boolean
    this.expectTokenType(token, 'java.lang.Boolean')
    const value = this.boolean()
    this.addReference(value)
    return value
  }

  /** Читает nullable-значение `java.lang.Integer` или ссылку на него. */
  boxedNumber(): number | null {
    const token = this.integer()
    if (token === 0) return null
    if (token < 0) return this.reference(token, 'number') as number
    this.expectTokenType(token, 'java.lang.Integer')
    const value = this.integer()
    this.addReference(value)
    return value
  }

  /** Читает следующее целочисленное значение пакета. */
  private integer(): number {
    const value = this.values[this.position--]
    if (!Number.isInteger(value)) throw new GwtDispatchError('Ожидалось число')
    return value as number
  }

  /** Разрешает отрицательный GWT-токен в ранее прочитанное значение указанного типа. */
  private reference(token: number, type: 'boolean' | 'number'): unknown {
    const value = this.references[-token - 1]
    if (typeof value !== type) throw new GwtDispatchError('Некорректная GWT-ссылка')
    return value
  }

  /** Проверяет тип значения по положительному токену таблицы строк. */
  private expectTokenType(token: number, expected: string): void {
    const actual = this.strings[token - 1]
    if (!actual?.startsWith(`${expected}/`)) {
      throw new GwtDispatchError(`Ожидался тип ${expected}, получен ${actual}`)
    }
  }
}

/** Декодирует успешный ответ GWT Dispatch в персональные настройки пользователя. */
export const decodePersonalSettings = (body: string): PersonalSettings => {
  let packet: unknown
  try {
    packet = JSON.parse(body.slice(4))
  } catch {
    throw new GwtDispatchError('Некорректный JSON в GWT-ответе', body)
  }
  if (!Array.isArray(packet) || !Array.isArray(packet.at(-3))) {
    throw new GwtDispatchError('Некорректный GWT-ответ', body)
  }

  const reader = new GwtReader(packet.slice(0, -3), packet.at(-3) as string[])
  reader.expectType(PERSONAL_SETTINGS_RESPONSE)
  reader.addReference({})
  reader.expectType(PERSONAL_SETTINGS_DTO)

  const result = {} as PersonalSettings
  reader.addReference(result)
  result.addCommentInlineFormPresentation = reader.string()
  result.fontSize = reader.boxedNumber()
  result.gwtStackMode = reader.string()
  result.homePage = reader.string()
  result.interfaceCompact = reader.boxedBoolean()
  result.locale = reader.string()
  result.objectChangeTrackingEnabled = reader.boolean()
  result.personUuid = reader.string()
  result.showAdvancedSearchElements = reader.boxedBoolean()
  result.themeAdmin = reader.string()
  result.themeOperator = reader.string()
  result.timeZoneId = reader.string()
  result.useAdvancedSearch = reader.boxedBoolean()
  result.useUserQATiles = reader.boxedBoolean()
  return result
}
