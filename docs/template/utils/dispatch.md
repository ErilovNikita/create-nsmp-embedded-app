# Dispatch

[Вернуться к списку утилит](./)

Модуль `dispatch` предназначен для получения данных из сервиса Desk с помощью
универсальной функции Dispatch. Dispatch формирует GWT-RPC-запрос, отправляет
его в Desk и декодирует ответ.

## Dispatch action

Универсальный метод `dispatch(action, userUuid, actionSignature?)` выполняет
произвольный GWT Dispatch action и возвращает успешный ответ Desk без
декодирования. Если сигнатура action не передана, она извлекается из policy-файла
GWT-сборки.

```ts
import { Dispatch } from './utils/dispatch'

const dispatch = new Dispatch()
const responseBody = await dispatch.dispatch(
  'ru.naumen.core.shared.dispatch.GetUserPersonalSettingsAction',
  jsApi.getCurrentUser().uuid,
)
```

## Получение персональных настроек

```ts
import { Dispatch, type PersonalSettings } from './utils/dispatch'

const client = new Dispatch()
const settings: PersonalSettings = await client.getPersonalSettings(
  jsApi.getCurrentUser().uuid,
)

console.log(settings.locale)
console.log(settings.themeOperator)
```

Метод `getPersonalSettings(userUuid)` получает персональные настройки
пользователя через Dispatch и возвращает объект `PersonalSettings`. Метод
`getThemeOperator(userUuid)` — удобный специализированный метод этого же
клиента: он возвращает только тему операторского интерфейса или `null`, если
тема не задана.

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

## Настройка Dispatch

Для формирования Dispatch-запросов параметры подключения к Desk, CSRF-токен,
policy hash и сигнатура GWT action определяются автоматически. Для
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

- `new Dispatch(options?)` — создаёт клиент для выполнения GWT-RPC-запросов к Desk;
- `client.dispatch(action, userUuid, actionSignature?)` — выполняет произвольный action;
- `client.getPersonalSettings(userUuid)` — метод получения персональных настроек;
- `client.getThemeOperator(userUuid)` — метод получения темы оператора;
- `GwtDispatchError` — ошибка GWT Dispatch;
- `PersonalSettings` — тип результата;
- `DispatchOptions` — тип параметров клиента.

