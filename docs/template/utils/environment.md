# Environment

[Вернуться к списку утилит](./)

Модуль `environment` определяет текущее окружение приложения по встроенному
флагу Vite `import.meta.env.DEV`. В режиме разработки он возвращает
`development`, во всех остальных режимах — `production`.

## Использование

Для условной логики удобнее импортировать готовые булевы флаги:

```ts
import { isDev, isProd } from './utils/environment'

if (isDev) {
  console.log('Приложение запущено в режиме разработки')
}

if (isProd) {
  console.log('Приложение запущено в production-режиме')
}
```

Если нужно получить название окружения, используйте константу `environment`:

```ts
import { environment, Environment } from './utils/environment'

if (environment === Environment.Production) {
  // Код только для production-сборки
}
```

Функция `getEnvironment()` позволяет получить то же значение явно:

```ts
import { getEnvironment } from './utils/environment'

const currentEnvironment = getEnvironment()
```

## Доступные значения

```ts
enum Environment {
  Development = 'development',
  Production = 'production',
}
```

Утилита опирается на режим Vite, а не на файлы `.env` напрямую. При запуске
`npm run dev` значение будет `development`, при `npm run build` — `production`.

## Доступные экспорты

- `getEnvironment()` — вычисляет и возвращает текущее окружение;
- `environment` — окружение, вычисленное при импорте модуля;
- `isDev` — `true` в режиме разработки;
- `isProd` — `true` в production-режиме;
- `Environment` — перечисление доступных значений окружения.
