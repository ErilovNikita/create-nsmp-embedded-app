import type { GitHubRelease, GitHubVersionOptions } from './types'

/**
 * Получает теги опубликованных стабильных релизов публичного репозитория GitHub.
 * Черновики и prerelease-релизы не включаются в результат.
 *
 * @param options Владелец и имя публичного репозитория GitHub.
 * @returns Список тегов релизов в порядке ответа GitHub API.
 * @throws Если параметры пусты, API вернул ошибку или ответ имеет неверный формат.
 */
export const getGitHubReleaseTags = async ({
  owner,
  repo,
}: GitHubVersionOptions): Promise<string[]> => {
  if (!owner.trim() || !repo.trim()) {
    throw new Error('GitHub owner and repository must not be empty')
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  try {
    const url = new URL(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases`,
      'https://api.github.com',
    )
    url.searchParams.set('per_page', '100')

    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`.trim())
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data)) throw new Error('response is not an array')

    return (data as GitHubRelease[])
      .filter(release => !release.draft && !release.prerelease && typeof release.tag_name === 'string')
      .map(release => release.tag_name as string)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get GitHub releases: ${message}`)
  }
}
