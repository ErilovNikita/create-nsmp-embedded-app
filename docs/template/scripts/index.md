# Скрипты шаблона

Шаблон поставляет npm-команды и два Node.js-скрипта для разработки, сборки и
публикации embedded-приложения.

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Запускает Vite в режиме `development` с прокси запросов `/sd/` в NSMP. |
| `npm run pack:modules` | Запускает `scripts/pack-modules.js` и формирует XML скриптовых модулей NSMP. |
| `npm run build` | Упаковывает модули, проверяет TypeScript, собирает Vite-приложение и создаёт ZIP-архив. |
| `npm run deploy` | Запускает `scripts/deploy.js` и загружает собранный ZIP в NSMP. |
| `npm run release` | Выполняет `build`, затем `deploy`. |

## Исходные скрипты

### `scripts/pack-modules.js`

Читает файлы из `modules/`, рассчитывает их контрольные суммы и создаёт
`public/modules/parameters.xml`. Этот XML попадает в production-сборку и нужен
для импорта скриптовых модулей в NSMP.

[Подробнее об упаковке модулей →](./pack-modules)

### `scripts/deploy.js`

Читает настройки `NSMP_*`, находит ZIP в `dist-zip/`, формирует
`multipart/form-data` запрос и загружает архив в API инсталляции NSMP.

[Подробнее о публикации →](./deploy)

Для параметров локального запуска, сборки и релиза используйте разделы
[«Локальный запуск»](../development), [«Сборка приложения»](../build) и
[«Команды»](../commands).
