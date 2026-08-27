import packageJson from '../../../package.json'
import { getGitHubReleaseTags } from './github'
import { getGitLabReleaseTags } from './gitlab'
import type {
  SemanticVersion,
  VersionCheckResult,
  VersionComparison,
  VersionSource,
} from './types'

const VERSION_PATTERN = /(?:^|[^0-9])v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z.-]+)?(?:$|[^0-9A-Za-z.+-])/

/**
 * Разбирает версию или тег релиза на числовые компоненты SemVer.
 *
 * @param value Версия или тег, например `1.2.3`, `v1.2.3` или `release-v1.2.3-beta.1`.
 * @returns Разобранные компоненты версии.
 * @throws Если строка не содержит корректную версию SemVer.
 */
const parseVersion = (value: string): SemanticVersion => {
  const match = value.trim().match(VERSION_PATTERN)
  if (!match) throw new Error(`Invalid semantic version: "${value}"`)

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4]?.split('.') ?? [],
  }
}

/**
 * Приводит версию или тег релиза к стандартной записи SemVer без префиксов.
 * Метаданные сборки отбрасываются, prerelease-часть сохраняется.
 *
 * @param value Исходная версия или тег релиза.
 * @returns Нормализованная версия, например `1.2.3` или `1.2.3-beta.1`.
 * @throws Если строка не содержит корректную версию SemVer.
 */
export const normalizeVersion = (value: string): string => {
  const version = parseVersion(value)
  const prerelease = version.prerelease.length > 0
    ? `-${version.prerelease.join('.')}`
    : ''

  return `${version.major}.${version.minor}.${version.patch}${prerelease}`
}

/**
 * Сравнивает prerelease-компоненты двух версий по правилам SemVer.
 *
 * @param local Prerelease-компоненты текущей версии.
 * @param remote Prerelease-компоненты релизной версии.
 * @returns `-1`, если текущая версия ниже; `0`, если равна; `1`, если выше.
 */
const comparePrerelease = (local: string[], remote: string[]): VersionComparison => {
  if (local.length === 0 && remote.length === 0) return 0
  if (local.length === 0) return 1
  if (remote.length === 0) return -1

  const length = Math.max(local.length, remote.length)
  for (let index = 0; index < length; index += 1) {
    const left = local[index]
    const right = remote[index]
    if (left === undefined) return -1
    if (right === undefined) return 1
    if (left === right) continue

    const leftIsNumber = /^\d+$/.test(left)
    const rightIsNumber = /^\d+$/.test(right)
    if (leftIsNumber && rightIsNumber) return Number(left) < Number(right) ? -1 : 1
    if (leftIsNumber !== rightIsNumber) return leftIsNumber ? -1 : 1
    return left < right ? -1 : 1
  }

  return 0
}

/**
 * Возвращает текущую версию приложения из `package.json`.
 *
 * @returns Нормализованная текущая версия приложения.
 */
export const getCurrentVersion = (): string => normalizeVersion(packageJson.version)

/**
 * Сравнивает текущую и релизную версии по правилам SemVer.
 * Поддерживает обычные версии и теги вида `v1.2.3`, `app-v1.2.3` и
 * `refs/tags/v1.2.3`. Метаданные сборки при сравнении игнорируются.
 *
 * @param localVersion Текущая версия приложения.
 * @param remoteVersion Последняя релизная версия.
 * @returns `-1`, если доступна новая версия; `0`, если версия актуальна;
 * `1`, если текущая версия выше релизной и считается тестовой.
 * @throws Если хотя бы одно значение не содержит корректную версию SemVer.
 */
export const compareVersions = (
  localVersion: string,
  remoteVersion: string,
): VersionComparison => {
  const local = parseVersion(localVersion)
  const remote = parseVersion(remoteVersion)
  const localCore = [local.major, local.minor, local.patch]
  const remoteCore = [remote.major, remote.minor, remote.patch]

  for (let index = 0; index < localCore.length; index += 1) {
    if (localCore[index] === remoteCore[index]) continue
    return localCore[index]! < remoteCore[index]! ? -1 : 1
  }

  return comparePrerelease(local.prerelease, remote.prerelease)
}

/**
 * Формирует пользовательское сообщение о состоянии версии приложения.
 * Значения версий в сообщении автоматически нормализуются.
 *
 * @param comparison Результат выполнения `compareVersions`.
 * @param currentVersion Текущая версия приложения.
 * @param latestVersion Последняя релизная версия.
 * @returns Сообщение об обновлении, актуальной или тестовой версии.
 */
export const getVersionMessage = (
  comparison: VersionComparison,
  currentVersion: string,
  latestVersion: string,
): string => {
  const normalizedCurrentVersion = normalizeVersion(currentVersion)
  const normalizedLatestVersion = normalizeVersion(latestVersion)
  const messages: Record<VersionComparison, string> = {
    [-1]: `Доступна новая версия приложения ${normalizedLatestVersion}.`,
    [0]: `Установлена актуальная версия приложения: ${normalizedCurrentVersion}.`,
    [1]: `Используется тестовая версия приложения: ${normalizedCurrentVersion} > ${normalizedLatestVersion}.`,
  }

  return messages[comparison]
}

/**
 * Получает последнюю стабильную версию из публичного репозитория GitHub или GitLab.
 * Порядок релизов в ответе API не учитывается: выбирается наибольшая версия SemVer.
 * Черновики, prerelease-релизы и некорректные теги исключаются.
 *
 * @param source Сервис и идентификаторы публичного репозитория.
 * @returns Нормализованная последняя стабильная версия.
 * @throws Если API недоступен или среди релизов нет корректных стабильных версий.
 */
export const getLastVersion = async (source: VersionSource): Promise<string> => {
  const tags = source.service === 'github'
    ? await getGitHubReleaseTags(source)
    : await getGitLabReleaseTags(source)

  const validTags = tags.filter(tag => {
    try {
      const version = parseVersion(tag)
      return version.prerelease.length === 0
    } catch {
      return false
    }
  })

  if (validTags.length === 0) {
    throw new Error(`No valid release versions found in ${source.service}`)
  }

  const latestTag = validTags.reduce(
    (latest, tag) => compareVersions(latest, tag) < 0 ? tag : latest,
  )

  return normalizeVersion(latestTag)
}

/**
 * Выполняет полную проверку версии приложения одним вызовом.
 * Получает последнюю версию, сравнивает её с текущей и формирует сообщение.
 *
 * @param source Сервис и идентификаторы публичного репозитория.
 * @param currentVersion Текущая версия вручную. По умолчанию берётся из `package.json`.
 * @returns Версии, результат сравнения и готовое пользовательское сообщение.
 * @throws Если версия некорректна или не удалось получить релизы.
 */
export const checkVersion = async (
  source: VersionSource,
  currentVersion = getCurrentVersion(),
): Promise<VersionCheckResult> => {
  const normalizedCurrentVersion = normalizeVersion(currentVersion)
  const latestVersion = await getLastVersion(source)
  const comparison = compareVersions(normalizedCurrentVersion, latestVersion)

  return {
    currentVersion: normalizedCurrentVersion,
    latestVersion,
    comparison,
    message: getVersionMessage(comparison, normalizedCurrentVersion, latestVersion),
  }
}

export { getGitHubReleaseTags, getGitLabReleaseTags }
export type {
  GitHubVersionOptions,
  GitLabVersionOptions,
  VersionCheckResult,
  VersionComparison,
  VersionSource,
} from './types'
