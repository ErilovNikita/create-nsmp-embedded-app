# Публикация в NSMP

Публикация вынесена в отдельную команду и использует архив, уже созданный Vite.

## Настройка

```bash
cp example.env.deploy .env.deploy.local
```

Минимальная конфигурация:

```dotenv
NSMP_URL=https://support.example.ru
NSMP_ACCESS_KEY=replace-me
```

## Сборка и публикация

Одной командой:

```bash
npm run release
```

Или отдельными этапами:

```bash
npm run build
npm run deploy
```

## Что делает deploy

1. Загружает `.env`, `.env.local`, `.env.deploy` и `.env.deploy.local`.
2. Проверяет URL и access key.
3. Определяет код и версию приложения.
4. Читает соответствующий ZIP из `dist-zip/`.
5. Формирует `multipart/form-data` с метаданными приложения.
6. Отправляет архив в `/sd/services/smpsync/ea`.
7. Возвращает ненулевой код процесса при ошибке.

Access key не выводится в лог. Время ожидания ответа — 60 секунд.

## Ручная публикация из CI

В шаблоне есть конфигурации для [GitHub Actions](./github-actions) и [GitLab CI](./gitlab-ci). Обе запускаются только вручную, чтобы push сам по себе не изменял приложение на инсталляции.
