# Утилита получения темы

[Вернуться к списку утилит](./)

Модуль `theme` загружает строковую конфигурацию темы NSMP по её коду через
endpoint `/sd/jspresource`.

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
- `ThemeError` — ошибка загрузки конфигурации темы.
