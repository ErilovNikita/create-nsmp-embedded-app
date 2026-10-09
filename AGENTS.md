# Repository Guidelines

## Назначение и структура шаблона

Руководство описывает разработку embedded-приложения NSMP на Vue 3, TypeScript и Vite. В этом репозитории приложение находится в `template/`; все команды ниже выполняйте из этой папки. В отдельном проекте на основе шаблона выполняйте их из корня приложения.

- `src/main.ts` — инициализация JS API, регистрация плагинов и запуск Vue.
- `src/App.vue` — основной экран; `src/components/` — переиспользуемые компоненты.
- `src/services/` — прикладные функции; `src/styles/global.css` — общие стили.
- `src/utils/` — подключённые утилиты NSMP. В данном репозитории их исходники находятся в `utilities/`, а локальная разработка использует ссылку `template/src/utils` на этот каталог. В отдельном приложении доступны только выбранные утилиты; перед импортом проверьте наличие модуля. Для `theme` необходим также `dispatch`.
- `public/` — статические ресурсы; `modules/` — серверные скриптовые модули; `scripts/` — упаковка и публикация.

## Локальный запуск и окружение

Используйте Node.js 18+ и npm:

```bash
npm install
cp example.env .env.development
npm run dev
```

Заполните `.env.development`: `VITE_ACCESS_KEY` — ключ разработки, `VITE_APP_URL` — локальный URL, `VITE_APP_REAL_URL` — адрес инсталляции, `VITE_REST_PATH` — REST-путь, `VITE_USER_UUID`, `VITE_SUBJECT_UUID`, `VITE_USER_LOGIN` — контекст пользователя и объекта. Dev-сервер проксирует `/sd/` на `VITE_APP_REAL_URL`, поддерживает WebSocket и тестовые TLS-сертификаты. После изменения ENV перезапустите сервер.

В `src/main.ts` функция `createInitVariableFromEnv(import.meta.env)` формирует параметры, затем `initializeJsApi(mock, params)` инициализирует API. Vue монтируется после успешной инициализации; экземпляр передаётся через `app.provide('jsApi', jsApi)`. Настраивайте локальные mock-данные в объекте `mock`. Для запросов используйте типизированный `jsApi.requests.json<T>()`, контекст получайте через `jsApi.getCurrentUser()`, URL — через `getAppRestBaseUrl()` и `getAppBaseUrl()`. Пример находится в `src/components/User.vue`.

## Утилита environment

Импортируйте `isDev`, `isProd`, `environment`, `Environment` и `getEnvironment` из `./utils/environment` в файлах непосредственно внутри `src/`. Из вложенных каталогов корректируйте относительный путь.

```ts
import { isDev, environment, Environment } from './utils/environment'

if (isDev) console.debug('Локальный режим')
const production = environment === Environment.Production
```

Окружение определяется по `import.meta.env.DEV`: значения — `development` и `production`. `environment` вычисляется при импорте; `getEnvironment()` возвращает текущее значение. Используйте флаги для диагностики и mock-логики, а не как механизм контроля доступа.

## Утилита platform

`detectPlatform(userAgent)` определяет `Platform.Windows`, `Platform.MacOS` или `Platform.Other`. `usePlatform(userAgent?)` возвращает вычисляемые Vue-ссылки `platform`, `isWindows`, `isMac`; в TypeScript обращайтесь к их `.value`.

```ts
import {
  usePlatform, Platform, PlatformFeature, applyPlatformFeatureRules,
} from './utils/platform'

const { platform } = usePlatform()
applyPlatformFeatureRules(platform.value, {
  [Platform.Windows]: [PlatformFeature.AntAnimations],
})
```

Правила имеют тип `PlatformFeatureRules`. `AntAnimations` отключает CSS-анимации и переходы Ant Design во всём документе. `getDisabledPlatformFeatures(platform, rules)` возвращает список, `applyDisabledPlatformFeatures(features)` применяет его напрямую. Повторный вызов заменяет список; пустой список снимает ограничение. Без DOM применение ничего не делает.

## Утилита dispatch

Создавайте один экземпляр `Dispatch` для нескольких запросов: он кеширует данные GWT-сборки.

```ts
import { Dispatch, GwtDispatchError } from './utils/dispatch'

const client = new Dispatch()
try {
  const settings = await client.getPersonalSettings(jsApi.getCurrentUser().uuid)
  console.log(settings.themeOperator, settings.locale, settings.timeZoneId)
} catch (error) {
  if (error instanceof GwtDispatchError) console.error(error.message)
  else throw error
}
```

`getPersonalSettings(userUuid)` возвращает персональные настройки, включая темы оператора и администратора, локаль, часовой пояс и размер шрифта; учитывайте nullable-поля. `getAllPersonalSettings()` возвращает доступные темы в `themes` и общие настройки. `dispatch(action, userUuid, actionSignature?)` выполняет произвольный action и возвращает сырой ответ.

Клиент обращается к `/sd/admin/dispatch`, автоматически ищет CSRF-токен в текущем или родительском документе, получает policy hash из `police.txt` и сигнатуры из `<policyHash>.gwt.rpc`. Для нестандартной инсталляции передайте `DispatchOptions`: `baseUrl`, `modulePath`, `csrfToken`, `policyHash`, `actionSignature`, `permutation`. Неверный UUID вызывает `TypeError`; ошибки протокола — `GwtDispatchError`, содержащий `responseBody`. Не выводите полные ответы с персональными данными в пользовательский интерфейс.

## Утилита theme

```ts
import { getCurrentUserTheme, getThemeConfigurationByCode } from './utils/theme'

const code = await getCurrentUserTheme(jsApi.getCurrentUser().uuid)
const configuration = await getThemeConfigurationByCode(code)
```

`getCurrentUserTheme(userUuid)` получает тему оператора через `dispatch`. Значение `system#default` или отсутствие персональной темы разрешается в код темы оператора по умолчанию; если определить её нельзя, возникает `ThemeError`.

`getThemeConfigurationByCode(code)` загружает строковую конфигурацию через `/sd/jspresource?id=common&method=theme&theme=...`. Утилита не применяет стили автоматически: обработайте конфигурацию в приложении. Пустой код вызывает `TypeError`, неуспешный HTTP-ответ — `ThemeError` с `responseBody`; обрабатывайте также сетевые ошибки.

## Утилита version

```ts
import { checkVersion } from './utils/version'

const result = await checkVersion({
  service: 'github', owner: 'your-team', repo: 'your-app',
})
console.log(result.message)
```

Для GitLab используйте `{ service: 'gitlab', project: 'group/project', baseUrl: 'https://gitlab.example.com' }`; `baseUrl` необязателен. Проверяются стабильные релизы публичных репозиториев: черновики, prerelease и некорректные теги исключаются, выбирается максимальная SemVer-версия.

Текущая версия берётся из `package.json` через определённую Vite константу `__APP_VERSION__`; её можно передать вторым аргументом `checkVersion`. Результат содержит `currentVersion`, `latestVersion`, `comparison`, `message`: `-1` означает доступное обновление, `0` — актуальную версию, `1` — версию выше опубликованной.

Для отдельных операций доступны `getCurrentVersion`, `getLastVersion`, `normalizeVersion`, `compareVersions`, `getVersionMessage`, `getGitHubReleaseTags`, `getGitLabReleaseTags`. Поддерживаются теги `v1.2.3` и `release-v1.2.3`. Обрабатывайте ошибки сети и отсутствие релизов, сохраняя работоспособность основного интерфейса.

## Сборка и серверные модули

- `npm run dev -- --host 0.0.0.0` — запускает сервер с доступом по сети.
- `npm run pack:modules` — упаковывает файлы из `modules/`, включая вложенные каталоги, в `public/modules/parameters.xml`.
- `npm run build` — выполняет упаковку модулей, `vue-tsc -b` и сборку Vite.

Код серверного модуля берётся из имени файла без расширения: `modules/create-task.js` → `create-task`. Используйте уникальные имена даже во вложенных каталогах. При отсутствии файлов XML не создаётся.

Сборка создаёт `dist/` и `dist-zip/<app-code>-<version>.zip`. Код архива определяется `VITE_APP_CODE` или `name` из `package.json`, версия — полем `version`. Сохраняйте `base: './'` в `vite.config.ts` для относительных путей ресурсов.

## Публикация в NSMP

```bash
cp example.env.deploy .env.deploy.local
npm run build
npm run deploy
```

Задайте `NSMP_URL` без `/sd` и `NSMP_ACCESS_KEY`. Дополнительные параметры: `NSMP_APP_CODE`, `NSMP_APP_TITLE`, `NSMP_APP_MIN_HEIGHT` (по умолчанию `1000`), `NSMP_APP_ENABLE` (`true`), `NSMP_TLS_REJECT_UNAUTHORIZED` (`true`). Булевы значения записывайте как `true` или `false`.

`NSMP_APP_CODE` задаёт код приложения на инсталляции, не меняя имя ZIP. `deploy` загружает готовый архив в `/sd/services/smpsync/ea`; `npm run release` последовательно собирает и публикует приложение. Публикация меняет приложение на указанной инсталляции: запускайте её только в рамках задачи на развёртывание. GitHub Actions и GitLab CI шаблона предусматривают ручной запуск.

Не коммитьте `.env.*` и ключи доступа; храните безопасные примеры. Переменные `VITE_*` доступны клиентскому коду: не помещайте туда секреты публикации. Отключайте проверку TLS только для доверенной тестовой инсталляции.

## Правила разработки и проверки

Используйте Vue SFC с `<script setup lang="ts">`, `PascalCase` для компонентов и `camelCase` для функций. Сохраняйте стиль соседнего кода, двухпробельные отступы Vue-разметки и существующее форматирование утилит. ESLint и Prettier не настроены.

Перед передачей изменений выполните `npm run build`, проверьте интерфейс локально и в embedded-контексте NSMP: инициализацию JS API, загрузку пользователя, обработку ошибок, тему и пути ресурсов. В самом шаблоне нет отдельной команды тестирования и установленного порога покрытия. В описании изменений указывайте затронутые сценарии, результаты проверок и новые ENV-параметры; для визуальных изменений прикладывайте скриншоты.
