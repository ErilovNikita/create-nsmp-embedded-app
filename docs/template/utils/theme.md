# Утилита получения темы

[Вернуться к списку утилит](./)

Модуль `theme` получает строковое значение темы из NSMP через endpoint
`GET /sd/jspresource?id=common&method=theme&theme=<THEME_NAME>`.

## Использование

```ts
import { getTheme } from './utils/theme'

const theme = await getTheme('dark')

console.log(theme)
```

Имя темы автоматически кодируется перед добавлением в URL. Метод возвращает
тело ответа сервера без преобразований в виде `Promise<string>`.

## Обработка ошибок

```ts
try {
  const theme = await getTheme('dark')
  console.log(theme)
} catch (error) {
  console.error('Не удалось загрузить тему', error)
}
```

Метод выбрасывает ошибку, если имя темы пустое или сервер вернул HTTP-статус за
пределами диапазона `200–299`.

## Доступные функции

- `getTheme(themeName)` — получает строковое значение указанной темы.
