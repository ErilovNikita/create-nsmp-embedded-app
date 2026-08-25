import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    addSideEffectImport,
    setupNsmpVueComponents
} from './dependencies.js'

const cliDir = path.dirname(fileURLToPath(import.meta.url))

export const templateDir = path.resolve(cliDir, '../template')
export const defaultProjectName = 'my-nsmp-app'

export const optionalDependencies = [
    { name: 'nsmp-icons', version: 'latest' },
    {
        name: '@iframe-resizer/child',
        version: '5.5.8',
        callback: addSideEffectImport
    },
    {
        name: '@minitwiks/nsmp-vue-components',
        version: '^1.0.0',
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
