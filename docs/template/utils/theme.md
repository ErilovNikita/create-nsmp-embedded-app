# Утилита получения темы

[Вернуться к списку утилит](./)

Модуль `theme` отвечает за работу с темой пользователя: получает код темы
текущего пользователя и загружает строковую конфигурацию NSMP по этому коду
через endpoint `/sd/jspresource`.

## Получение темы текущего пользователя

::: tip
При получении темы текущего пользователя всегда возвращается настоящий код
темы. Если в персональных настройках указано значение `system#default`, оно
будет разрезолвлено через метод [`getAllPersonalSettings`](./dispatch#getallpersonalsettings), после чего
возвращается код темы оператора по умолчанию.
:::

```ts
import { getCurrentUserTheme } from './utils/theme'

const themeCode = await getCurrentUserTheme(jsApi.getCurrentUser().uuid)

if (themeCode) {
  console.log(`Текущая тема: ${themeCode}`)
}
```

## Получение конфигурации темы

```ts
import { getThemeConfigurationByCode, ThemeError } from './utils/theme'

try {
  const configuration = await getThemeConfigurationByCode('operator')
  console.log(configuration)
} catch (error) {
  if (error instanceof ThemeError) {
    console.error(error.message, error.responseBody)
  }
}
```

Функция выполняет запрос
`GET /sd/jspresource?id=common&method=theme&theme=<THEME_CODE>`. Код темы
автоматически кодируется через `URLSearchParams`.

Пустой код темы вызывает `TypeError`. При недоступности endpoint функция
выбрасывает `ThemeError`; исходное тело ответа доступно в `responseBody`.

## Публичный API

- `getThemeConfigurationByCode(themeCode)` — возвращает конфигурацию темы по коду;
- `getCurrentUserTheme(userUuid)` — возвращает код темы текущего пользователя;
- `ThemeError` — ошибка загрузки конфигурации темы.
