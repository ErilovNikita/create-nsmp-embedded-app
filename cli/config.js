import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    addSideEffectImport,
    setupNsmpVueComponents
} from './dependencies.js'

const cliDir = path.dirname(fileURLToPath(import.meta.url))

export const templateDir = path.resolve(cliDir, '../template')
export const utilitiesDir = path.resolve(cliDir, '../utilities')
export const defaultProjectName = 'my-nsmp-app'

export const optionalUtilities = [
    {
        name: 'environment',
        description: 'Определение окружения Vite (development/production).'
    },
    {
        name: 'version',
        description: 'Проверка версий из релизов GitHub/GitLab.'
    },
    {
        name: 'theme',
        description: 'Получение конфигурации темы NSMP (требует dispatch).',
        dependencies: ['dispatch']
    },
    {
        name: 'dispatch',
        description: 'Работа с GWT Dispatch и персональными настройками.'
    },
    {
        name: 'platform',
        description: 'Определение платформы и правила возможностей интерфейса.'
    }
]

export function resolveUtilities(utilities) {
    const selected = new Set(utilities)
    const utilitiesByName = new Map(
        optionalUtilities.map(utility => [utility.name, utility])
    )

    for (const utilityName of selected) {
        const utility = utilitiesByName.get(utilityName)
        utility?.dependencies?.forEach(dependency => selected.add(dependency))
    }

    return optionalUtilities
        .map(utility => utility.name)
        .filter(utilityName => selected.has(utilityName))
}

export const optionalDependencies = [
    {
        name: 'nsmp-icons',
        version: 'latest',
        description: 'Набор иконок для интерфейса NSMP.'
    },
    {
        name: '@iframe-resizer/child',
        version: '5.5.8',
        description: 'Автоматически подстраивает высоту embedded-приложения.',
        callback: addSideEffectImport
    },
    {
        name: '@minitwiks/nsmp-vue-components',
        version: '^1.0.0',
        description: 'Vue-компоненты NSMP и интеграция с Ant Design Vue.',
        callback: setupNsmpVueComponents
    },
    // { name: 'package', version: '1.2.3', callback: async context => {} },
]

export function normalizeDependency(dependency) {
    return typeof dependency === 'string' ? { name: dependency } : dependency
}

export function isValidProjectName(value) {
    return /^[a-z0-9-]+$/.test(value)
}
