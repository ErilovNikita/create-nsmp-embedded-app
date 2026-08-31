# Разработка генератора

## Подготовка

```bash
npm install
npm --prefix template install
```

## Проверки

Перед отправкой изменений выполните:

```bash
npm run check
npm test
npm run build
npm run docs:build
```

## Работа с шаблоном

Файлы из `template/` копируются в новый проект. Некоторые dotfiles хранятся под безопасными для npm именами:

| В npm-шаблоне | В созданном проекте |
| --- | --- |
| `_gitignore` | `.gitignore` |
| `_github/` | `.github/` |
| `_gitlab-ci.yml` | `.gitlab-ci.yml` |

Переименование выполняется в `cli/project.js`.

## Проверка npm-пакета

Перед публикацией убедитесь, что шаблонные файлы входят в архив, а локальные ENV отсутствуют:

```bash
npm pack --dry-run
```

## Документация

Исходники находятся в `docs/`. Навигация и поиск настраиваются в `docs/.vitepress/config.ts`, визуальная тема — в `docs/.vitepress/theme/style.css`.
