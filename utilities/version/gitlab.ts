import type { GitLabRelease, GitLabVersionOptions } from './types'

/**
 * Получает теги опубликованных релизов публичного проекта GitLab.
 * Будущие релизы не включаются в результат.
 *
 * @param options Идентификатор проекта и необязательный адрес экземпляра GitLab.
 * @returns Список тегов релизов в порядке ответа GitLab API.
 * @throws Если проект не указан, API вернул ошибку или ответ имеет неверный формат.
 */
export const getGitLabReleaseTags = async ({
  project,
  baseUrl = 'https://gitlab.com',
}: GitLabVersionOptions): Promise<string[]> => {
  if (String(project).trim() === '') throw new Error('GitLab project must not be empty')

  const headers: HeadersInit = { Accept: 'application/json' }

  try {
    const apiRoot = new URL('/api/v4/', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)
    const url = new URL(`projects/${encodeURIComponent(String(project))}/releases`, apiRoot)
    url.searchParams.set('per_page', '100')

    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`.trim())
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data)) throw new Error('response is not an array')

    return (data as GitLabRelease[])
      .filter(release => !release.upcoming_release && typeof release.tag_name === 'string')
      .map(release => release.tag_name as string)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get GitLab releases: ${message}`)
  }
}
