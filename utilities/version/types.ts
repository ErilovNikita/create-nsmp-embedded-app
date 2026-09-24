export interface GitHubVersionOptions {
  owner: string
  repo: string
}

export interface GitLabVersionOptions {
  /** Числовой идентификатор или путь вида `group/subgroup/project`. */
  project: string | number
  baseUrl?: string
}

export type VersionSource =
  | ({ service: 'github' } & GitHubVersionOptions)
  | ({ service: 'gitlab' } & GitLabVersionOptions)

/** 
 * `-1` — доступно обновление, 
 * `0` — версия актуальна, 
 * `1` — версия тестовая. 
 */
export type VersionComparison = -1 | 0 | 1

export interface VersionCheckResult {
  currentVersion: string
  latestVersion: string
  comparison: VersionComparison
  message: string
}

export interface GitHubRelease {
  draft?: boolean
  prerelease?: boolean
  tag_name?: unknown
}

export interface GitLabRelease {
  upcoming_release?: boolean
  tag_name?: unknown
}

export interface SemanticVersion {
  major: number
  minor: number
  patch: number
  prerelease: string[]
}
