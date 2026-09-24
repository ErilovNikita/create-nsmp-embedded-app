# Скрипт публикации

`scripts/deploy.js` запускается командой:

```bash
npm run deploy
```

Скрипт загружает `.env`, `.env.local`, `.env.deploy` и `.env.deploy.local`,
проверяет `NSMP_URL` и `NSMP_ACCESS_KEY`, затем отправляет ZIP-архив из
`dist-zip/` в `/sd/services/smpsync/ea`.

Для публикации сначала соберите приложение:

```bash
npm run build
npm run deploy
```

Команда `npm run release` выполняет оба шага подряд. Полный перечень
переменных окружения и настройки CI приведены в разделах
[«Переменные окружения»](../environment) и [«Публикация в NSMP»](../deployment).
