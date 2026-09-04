# Тема и персональные настройки

[Вернуться к списку утилит](./)

Модуль `theme` получает персональные настройки пользователя напрямую через
GWT Dispatch NSMP. Помимо темы операторского интерфейса клиент возвращает язык,
часовой пояс, размер шрифта, настройки поиска и другие пользовательские параметры.

## Получение темы

```ts
import { GwtPersonalSettingsClient } from './utils/theme'

const client = new GwtPersonalSettingsClient()
const theme = await client.getThemeOperator(jsApi.getCurrentUser().uuid)

if (theme) {
  console.log(`Текущая тема: ${theme}`)
}
```

`getThemeOperator(userUuid)` возвращает `Promise<string | null>`. Значение `null`
означает, что тема для пользователя не задана.

## Получение конфигурации темы

Код выбранной темы можно передать в `getThemeConfigurationByCode()`, чтобы
получить её строковую конфигурацию через endpoint `/sd/jspresource`:

```ts
import {
  getThemeConfigurationByCode,
  GwtPersonalSettingsClient,
} from './utils/theme'

const client = new GwtPersonalSettingsClient()
const themeCode = await client.getThemeOperator(jsApi.getCurrentUser().uuid)

if (themeCode) {
  const configuration = await getThemeConfigurationByCode(themeCode)
  console.log(configuration)
}
```

Функция выполняет запрос
`GET /sd/jspresource?id=common&method=theme&theme=<THEME_CODE>`. Код темы
автоматически кодируется через `URLSearchParams`.

## Получение всех настроек

```ts
import {
  GwtPersonalSettingsClient,
  type PersonalSettings,
} from './utils/theme'

const client = new GwtPersonalSettingsClient()
const settings: PersonalSettings = await client.getPersonalSettings(
  jsApi.getCurrentUser().uuid,
)

console.log(settings.locale)
console.log(settings.timeZoneId)
console.log(settings.themeOperator)
```

Метод `getPersonalSettings(userUuid)` возвращает объект `PersonalSettings`:

| Поле | Тип | Назначение |
| --- | --- | --- |
| `themeOperator` | `string \| null` | Тема интерфейса оператора |
| `themeAdmin` | `string \| null` | Тема административного интерфейса |
| `locale` | `string \| null` | Локаль пользователя |
| `timeZoneId` | `string \| null` | Идентификатор часового пояса |
| `fontSize` | `number \| null` | Размер шрифта интерфейса |
| `homePage` | `string \| null` | Домашняя страница |
| `interfaceCompact` | `boolean \| null` | Компактный режим интерфейса |
| `gwtStackMode` | `string \| null` | Режим стека GWT |
| `addCommentInlineFormPresentation` | `string \| null` | Представление формы добавления комментария |
| `objectChangeTrackingEnabled` | `boolean` | Включено ли отслеживание изменений объектов |
| `showAdvancedSearchElements` | `boolean \| null` | Показывать ли элементы расширенного поиска |
| `useAdvancedSearch` | `boolean \| null` | Использовать ли расширенный поиск |
| `useUserQATiles` | `boolean \| null` | Использовать ли пользовательские QA-плитки |
| `personUuid` | `string \| null` | UUID пользователя из настроек |

## Настройка клиента

Обычно клиенту не нужны параметры: адрес NSMP, CSRF-токен, policy hash и
сигнатура GWT action определяются автоматически. Для нестандартного окружения
их можно переопределить:

```ts
const client = new GwtPersonalSettingsClient({
  baseUrl: 'https://nsmp.example.com',
  modulePath: '/sd/admin/',
  csrfToken: 'known-csrf-token',
  policyHash: '0123456789ABCDEF0123456789ABCDEF',
  actionSignature: '1234567890',
  permutation: '0123456789ABCDEF0123456789ABCDEF',
})
```

| Параметр | Значение по умолчанию |
| --- | --- |
| `baseUrl` | `window.location.origin` |
| `modulePath` | `/sd/admin/` |
| `csrfToken` | Содержимое `meta[name="_csrf"]` текущего или родительского документа |
| `policyHash` | Значение, полученное из `/sd/admin/police.txt` |
| `actionSignature` | Сигнатура, извлечённая из файла `<policyHash>.gwt.rpc` |
| `permutation` | Значение `policyHash` |

Загруженные данные GWT-сборки кешируются внутри экземпляра клиента. Для
нескольких запросов следует повторно использовать один экземпляр.

## Обработка ошибок

```ts
import { GwtDispatchError, GwtPersonalSettingsClient } from './utils/theme'

const client = new GwtPersonalSettingsClient()

try {
  const theme = await client.getThemeOperator(jsApi.getCurrentUser().uuid)
  console.log(theme)
} catch (error) {
  if (error instanceof GwtDispatchError) {
    console.error(error.message, error.responseBody)
  } else {
    console.error('Некорректный UUID пользователя', error)
  }
}
```

Клиент выбрасывает:

- `TypeError`, если UUID не соответствует формату NSMP, например `employee$123`;
- `TypeError`, если в `getThemeConfigurationByCode()` передан пустой код темы;
- `GwtDispatchError`, если не найден CSRF-токен, не удалось определить данные
  GWT-сборки, сервер вернул ошибку, endpoint конфигурации темы недоступен или
  ответ нельзя декодировать.

Поле `responseBody` у `GwtDispatchError` содержит исходное тело ответа, когда оно
доступно, и помогает диагностировать несовместимость с версией NSMP.

## Публичный API

- `new GwtPersonalSettingsClient(options?)` — создаёт клиент;
- `client.getThemeOperator(userUuid)` — возвращает тему оператора;
- `client.getPersonalSettings(userUuid)` — возвращает все персональные настройки;
- `getThemeConfigurationByCode(themeCode)` — возвращает конфигурацию темы по коду;
- `GwtDispatchError` — тип ошибки GWT Dispatch;
- `PersonalSettings` — тип результата;
- `GwtPersonalSettingsClientOptions` — тип параметров клиента.
