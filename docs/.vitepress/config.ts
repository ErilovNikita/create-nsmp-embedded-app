import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru-RU',
  title: 'Create NSMP Embedded App',
  description: 'Генератор встроенных приложений NSMP на Vue, TypeScript и Vite',
  base: '/create-nsmp-embedded-app/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#e8590c' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'NSMP Embedded App',
    nav: [
      { text: 'Работа с шаблоном', link: '/template/' },
      { text: 'Разработка генератора', link: '/generator/' }
    ],
    sidebar: {
      '/generator/': [
        {
          text: 'О генераторе',
          items: [
            { text: 'Как работает генератор', link: '/generator/' }
          ]
        },
        {
          text: 'Разработка генератора',
          items: [
            { text: 'Дополнительные зависимости', link: '/generator/optional-dependencies' },
            { text: 'Работа с репозиторием', link: '/generator/development' },
            { text: 'Команды разработки', link: '/generator/commands' }
          ]
        }
      ],
      '/template/': [
        {
          text: 'Работа с шаблоном',
          items: [
            { text: 'Возможности шаблона', link: '/template/' },
            { text: 'Быстрый старт', link: '/template/getting-started' },
            { text: 'Переменные окружения', link: '/template/environment' },
            { text: 'Локальный запуск', link: '/template/development' },
            { text: 'Сборка приложения', link: '/template/build' },
            { text: 'Команды', link: '/template/commands' }
          ]
        },
        {
          text: 'Публикация',
          items: [
            { text: 'Загрузка в NSMP', link: '/template/deployment' },
            { text: 'GitHub Actions', link: '/template/github-actions' },
            { text: 'GitLab CI', link: '/template/gitlab-ci' }
          ]
        },
        {
          text: 'Утилиты',
          items: [
            { text: 'Утилиты шаблона', link: '/template/utils/' },
            { text: 'Version', link: '/template/utils/version' },
            { text: 'Theme', link: '/template/utils/theme' },
            { text: 'Platform', link: '/template/utils/platform' }
          ]
        },
        {
          text: 'Помощь',
          items: [
            { text: 'Устранение проблем', link: '/template/troubleshooting' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск по документации'
          },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить поиск',
            footer: {
              selectText: 'выбрать',
              navigateText: 'перейти',
              closeText: 'закрыть'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ErilovNikita/create-nsmp-embedded-app' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/create-nsmp-embedded-app' }
    ],
    editLink: {
      pattern: 'https://github.com/ErilovNikita/create-nsmp-embedded-app/edit/main/docs/:path',
      text: 'Предложить изменение'
    },
    lastUpdated: {
      text: 'Обновлено'
    },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    outline: {
      label: 'На этой странице',
      level: [2, 3]
    },
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Тема оформления',
    lightModeSwitchTitle: 'Включить светлую тему',
    darkModeSwitchTitle: 'Включить тёмную тему'
  }
})
