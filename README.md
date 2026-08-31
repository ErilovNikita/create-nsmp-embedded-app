# Create NSMP Embedded App

> Интерактивный генератор embedded-приложений NSMP на Vue 3, TypeScript и Vite.

[![npm version](https://img.shields.io/npm/v/create-nsmp-embedded-app?logo=npm)](https://www.npmjs.com/package/create-nsmp-embedded-app)
[![npm downloads](https://img.shields.io/npm/dm/create-nsmp-embedded-app?logo=npm)](https://www.npmjs.com/package/create-nsmp-embedded-app)
[![Workflow status](https://img.shields.io/github/actions/workflow/status/ErilovNikita/create-nsmp-embedded-app/npm-publish.yml?branch=main&logo=githubactions&label=build)](https://github.com/ErilovNikita/create-nsmp-embedded-app/actions/workflows/npm-publish.yml)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

```text
    _   _______ __  _______     ______          __             __    __         __   ___  by @minitwiks
   / | / / ___//  |/  / __ \   / ____/___ ___  / /_  ___  ____/ /___/ /__  ____/ /  /   |  ____  ____
  /  |/ /\__ \/ /|_/ / /_/ /  / __/ / __ '__ \/ __ \/ _ \/ __  / __  / _ \/ __  /  / /| | / __ \/ __ \
 / /|  /___/ / /  / / ____/  / /___/ / / / / / /_/ /  __/ /_/ / /_/ /  __/ /_/ /  / ___ |/ /_/ / /_/ /
/_/ |_//____/_/  /_/_/      /_____/_/ /_/ /_/_.___/\___/\__,_/\__,_/\___/\__,_/  /_/  |_/ .___/ .___/
                                                                                       /_/   /_/
```

Создайте новый NSMP Embedded App одной командой. CLI задаст необходимые вопросы прямо в терминале, скопирует готовый шаблон и при необходимости установит зависимости.

> [!NOTE]
> Данный шаблон использует [собственную ветку](https://github.com/ErilovNikita/js-api) библиотеки `js-api`.

## Возможности

- готовый шаблон на Vue 3, TypeScript и Vite;
- локальная разработка с проксированием запросов NSMP;
- типизированный mock-слой `jsApi`;
- автоматическая сборка ZIP-архива;
- публикация приложения через ENV-конфигурацию;
- ручные workflow для GitHub Actions и GitLab CI;
- подключение дополнительных пакетов через интерактивный CLI.

## Быстрый старт

> [!INFO] Требования
> Node.js 18+ и npm.

```bash
npm create nsmp-embedded-app@latest
```

Затем:

```bash
cd my-nsmp-app
cp example.env .env.development
npm run dev
```

## Документация

Полное руководство по использованию шаблона, публикации в NSMP и доработке генератора находится в документации VitePress:
<a href="docs/index.md">
<img src="https://img.shields.io/badge/ОТКРЫТЬ_ДОКУМЕНТАЦИЮ-e8590c?style=for-the-badge&amp;logo=readthedocs&amp;logoColor=white" alt="Открыть документацию">
</a>

Для локального запуска документации:

```bash
npm install
npm run docs:dev
```

## Разработка

```bash
npm install
npm --prefix template install
npm run check
npm test
npm run build
npm run docs:build
```

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).
