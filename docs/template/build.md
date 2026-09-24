# Сборка приложения

## Production-сборка

```bash
npm run build
```

Команда выполняет три этапа:

1. `npm run pack:modules` упаковывает скриптовые модули из `modules/`, если они есть;
2. `vue-tsc -b` проверяет TypeScript;
3. `vite build` собирает приложение и запускает ZIP-плагин.

## Результат

```text
dist/                              # файлы приложения
dist-zip/<app-code>-<version>.zip  # архив NSMP
```

Код берётся из `VITE_APP_CODE`, а при его отсутствии — из `name` в `package.json`. Версия берётся из `version` в `package.json`.

Например:

```text
dist-zip/my-nsmp-app-1.2.0.zip
```

Vite использует относительный `base: "./"`, поэтому ресурсы внутри архива работают независимо от URL размещения embedded-приложения.

## Сборка без публикации

`npm run build` не обращается к инсталляции. Архив можно проверить или передать отдельно, а затем опубликовать командой:

```bash
npm run deploy
```

## Публикация после сборки

`npm run deploy` берёт ZIP из `dist-zip/` и загружает его в NSMP. Перед публикацией создайте `.env.deploy.local` и задайте в нём `NSMP_URL` и `NSMP_ACCESS_KEY`:

```bash
cp example.env.deploy .env.deploy.local
npm run deploy
```

Если нужно выполнить сборку и публикацию подряд, используйте:

```bash
npm run release
```

Подробные параметры публикации описаны в разделе [«Публикация в NSMP»](./deployment).
