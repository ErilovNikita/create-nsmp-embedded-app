# Утилита проверки версии

[Вернуться к списку утилит](./)

Модуль `version` проверяет версию приложения по стабильным релизам публичного
репозитория GitHub или GitLab. Все функции и типы импортируются через единую
точку входа:

```ts
import { checkVersion, type VersionCheckResult } from './utils/version'
```

Утилита поддерживает SemVer и распространённые форматы тегов: `1.2.3`,
`v1.2.3`, `release-v1.2.3` и `refs/tags/v1.2.3`. Возвращаемые версии
нормализуются до формата без префикса `v`. Черновики, prerelease-релизы и теги
без корректной версии не учитываются.

## Полная проверка версии

`checkVersion` — рекомендуемый способ использования. Метод получает последнюю
релизную версию, сравнивает её с версией приложения и формирует готовое
сообщение.

### GitHub

```ts
import { checkVersion, type VersionCheckResult } from './utils/version'

const result: VersionCheckResult = await checkVersion({
  service: 'github',
  owner: 'ErilovNikita',
  repo: 'create-nsmp-embedded-app',
})

console.log(result.message)
```

### GitLab

```ts
const result = await checkVersion({
  service: 'gitlab',
  project: 'group/subgroup/project',
})
```

Для публичного проекта на собственном сервере GitLab можно передать `baseUrl`:

```ts
const result = await checkVersion({
  service: 'gitlab',
  project: 'group/project',
  baseUrl: 'https://gitlab.example.com',
})
```

## Передача текущей версии

По умолчанию текущая версия читается из `package.json`. При необходимости её
можно передать вторым аргументом:

```ts
const result = await checkVersion(
  {
    service: 'github',
    owner: 'owner',
    repo: 'repository',
  },
  'v1.2.3',
)
```

## Результат проверки

```ts
interface VersionCheckResult {
  currentVersion: string
  latestVersion: string
  comparison: -1 | 0 | 1
  message: string
}
```

Значение `comparison`:

- `-1` — доступна новая версия приложения;
- `0` — установлена актуальная версия;
- `1` — текущая версия выше релизной и считается тестовой.

## Обработка ошибок

Сетевые ошибки следует обрабатывать в месте вызова:

```ts
try {
  const result = await checkVersion({
    service: 'github',
    owner: 'owner',
    repo: 'repository',
  })

  console.log(result.message)
} catch (error) {
  console.error('Не удалось проверить версию', error)
}
```

## Доступные функции

- `checkVersion(source, currentVersion?)` — выполняет полную проверку версии и
  возвращает `VersionCheckResult`;
- `getCurrentVersion()` — возвращает нормализованную версию из `package.json`;
- `getLastVersion(source)` — возвращает максимальную стабильную версию из
  GitHub или GitLab;
- `compareVersions(localVersion, remoteVersion)` — сравнивает две версии и
  возвращает `-1`, `0` или `1`;
- `getVersionMessage(comparison, currentVersion, latestVersion)` — формирует
  готовое сообщение о результате сравнения;
- `normalizeVersion(value)` — преобразует версию или тег к стандартному виду
  без префикса;
- `getGitHubReleaseTags(options)` — получает теги стабильных релизов GitHub;
- `getGitLabReleaseTags(options)` — получает теги опубликованных релизов GitLab.

## Доступные типы

- `VersionCheckResult` — полный результат проверки;
- `VersionComparison` — результат сравнения `-1 | 0 | 1`;
- `VersionSource` — параметры источника GitHub или GitLab;
- `GitHubVersionOptions` — владелец и имя репозитория GitHub;
- `GitLabVersionOptions` — проект и адрес сервера GitLab.
