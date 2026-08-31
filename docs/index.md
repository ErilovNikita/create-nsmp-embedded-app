---
layout: home

hero:
  name: Create NSMP Embedded App
  text: Встроенное приложение без лишней настройки
  tagline: Vue 3, TypeScript, Vite, сборка и публикация в NSMP в одном пакете.
  image:
    src: /logo.svg
    alt: NSMP Embedded App
  actions:
    - theme: brand
      text: Начать работу
      link: /template/getting-started
    - theme: alt
      text: Настроить публикацию
      link: /template/deployment

features:
  - icon:
      src: /icons/rocket.svg
      alt: Ракета
      width: 28
      height: 28
    title: Полностью готовый шаблон
    details: Vue 3, TypeScript, Vite, JS API, ZIP-сборка и публикация уже настроены — можно сразу переходить к разработке приложения.
  - icon:
      src: /icons/unplug.svg
      alt: Подключение
      width: 28
      height: 28
    title: Разработка с NSMP
    details: Dev-сервер проксирует запросы на инсталляцию, а ENV-конфигурация позволяет безопасно запускать и отлаживать приложение локально.
  - icon:
      src: /icons/blocks.svg
      alt: Модули
      width: 28
      height: 28
    title: Расширяемый генератор
    details: Подключайте дополнительные пакеты и автоматизируйте их настройку через декларативный список и callback-функции.
---

## Создайте приложение

```bash
npm create nsmp-embedded-app@latest my-app
cd my-app
npm run dev
```

Генератор задаст несколько коротких вопросов, создаст проект и при необходимости сразу установит зависимости.
