# Dispatch

[Вернуться к списку утилит](./)

Модуль `dispatch` использует штатный endpoint - `/sd/admin/dispatch` для выполнения запросов в формате GWT-RPC. 

Утилита формирует POST-запрос с именем action, параметрами и данными
GWT-сборки, а затем проверяет и декодирует ответ от NSMP. 
Такой механизм позволяет обращаться к серверным Dispatch action через единый протокол GWT-RPC.

Утилита автоматически получает данные GWT-сборки перед выполнением запроса.
Если `policyHash` не передан, она загружает `police.txt` и извлекает из него
hash. 

Если не указан `actionSignature` - то автоматически загружается файл `<policyHash>.gwt.rpc`, из которого извлекается сигнатура соответствующего
`action`. 

Полученные данные кешируются внутри экземпляра `Dispatch`.

## Dispatch action

Универсальный метод `dispatch(action, userUuid, actionSignature?)` выполняет
произвольный GWT Dispatch action и возвращает успешный ответ без
декодирования _(В сыром виде)_. Если сигнатура `action` не передана, она извлекается из policy-файла GWT-сборки.

```ts
import { Dispatch } from './utils/dispatch'

const dispatch = new Dispatch()
const responseBody = await dispatch.dispatch(
  'ru.naumen.core.shared.dispatch.GetUserPersonalSettingsAction',
  jsApi.getCurrentUser().uuid,
)
```

## Получение персональных настроек пользователя

### `getPersonalSettings(userUuid)`

```ts
import { type PersonalSettings } from './utils/dispatch'

const settings: PersonalSettings = await new Dispatch().getPersonalSettings(
  jsApi.getCurrentUser().uuid,
)

console.log(settings.locale)
console.log(settings.themeOperator)
```

Метод `getPersonalSettings(userUuid)` получает персональные настройки
пользователя через Dispatch и возвращает объект `PersonalSettings`.

> [!TIP]
> Получение кода темы текущего пользователя напрямую, вынесено в утилиту [`theme`](./theme.md).

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
| `objectChangeTrackingEnabled` | `boolean` | Отслеживание изменений объектов |
| `showAdvancedSearchElements` | `boolean \| null` | Элементы расширенного поиска |
| `useAdvancedSearch` | `boolean \| null` | Расширенный поиск |
| `useUserQATiles` | `boolean \| null` | Пользовательские QA-плитки |
| `personUuid` | `string \| null` | UUID пользователя |

## Получение персональных настроек по умолчанию

### `getAllPersonalSettings()`

```ts
const settings = await new Dispatch().getAllPersonalSettings()

const defaultTheme = settings.themes.find(theme => theme.operatorTheme)?.code
console.log(defaultTheme)
```

Метод `getAllPersonalSettings()` получает персональные настройки по умолчанию,
включая доступные темы и тему оператора по умолчанию. Метод не принимает
параметров и возвращает объект `AllPersonalSettings`.

| Поле | Тип | Назначение |
| --- | --- | --- |
| `themes` | `ThemeClient[]` | Доступные темы и признаки темы оператора или администратора |
| `changeTrackingSettings` | `unknown` | Настройки отслеживания изменений |

### Атрибуты темы (`ThemeClient`)

Каждый элемент массива `themes` содержит следующие атрибуты:

| Поле | Тип | Назначение |
| --- | --- | --- |
| `code` | `string` | Код темы |
| `title` | `string \| null` | Название темы |
| `displayedInAdminMode` | `boolean` | Доступность темы в административном режиме |
| `system` | `boolean` | Системная тема |
| `enabled` | `boolean` | Включённая тема |
| `operatorTheme` | `boolean` | Тема операторского интерфейса |
| `adminTheme` | `boolean` | Тема административного интерфейса |
| `image` | `string \| null` | Изображение темы |
| `paramsFile` | `unknown \| null` | Файл параметров темы |
| `logoFile` | `unknown \| null` | Основной файл логотипа |
| `logoLoginFile` | `unknown \| null` | Файл логотипа для страницы входа |

## Настройка Dispatch

Для формирования Dispatch-запросов параметры подключения к NSMP, `CSRF-токен`,
`policy hash` и сигнатура `GWT action` определяются автоматически. Для
нестандартного окружения их можно переопределить через параметры клиента:

```ts
const client = new Dispatch({
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
| `csrfToken` | `meta[name="_csrf"]` текущего или родительского документа |
| `policyHash` | `/sd/admin/police.txt` |
| `actionSignature` | Сигнатура из файла `<policyHash>.gwt.rpc` |
| `permutation` | Значение `policyHash` |

Данные GWT-сборки кешируются внутри экземпляра клиента, поэтому для нескольких
Dispatch-запросов следует использовать один экземпляр.

## Обработка ошибок

```ts
import { Dispatch, GwtDispatchError } from './utils/dispatch'

try {
  const settings = await new Dispatch().getPersonalSettings(
    jsApi.getCurrentUser().uuid,
  )
  console.log(settings)
} catch (error) {
  if (error instanceof GwtDispatchError) {
    console.error(error.message, error.responseBody)
  }
}
```

Клиент выбрасывает `TypeError`, если UUID не соответствует формату NSMP, и
`GwtDispatchError`, если не найден CSRF-токен, не удалось определить данные
GWT-сборки, сервер вернул ошибку или ответ нельзя декодировать.

## Публичный API

- `new Dispatch(options?)` — создаёт клиент для выполнения GWT-RPC-запросов к NSMP;
- `client.dispatch(action, userUuid, actionSignature?)` — выполняет произвольный action;
- `client.getPersonalSettings(userUuid)` — метод получения персональных настроек;
- `client.getAllPersonalSettings()` — метод получения общих персональных настроек и доступных тем;
- `GwtDispatchError` — ошибка GWT Dispatch;
- `PersonalSettings` — тип результата;
- `AllPersonalSettings` — тип общих персональных настроек;
- `DispatchOptions` — тип параметров клиента.

