import prompts from 'prompts'
import {
    isValidProjectName,
    normalizeDependency,
    optionalDependencies
} from './config.js'
import { printCancelled } from './ui.js'

export function createDependencyQuestion(dependency, index) {
    const { name } = normalizeDependency(dependency)

    return {
        type: 'confirm',
        name: `dependency_${index}`,
        message: `Подключить дополнительный пакет ${name}?`,
        initial: true
    }
}

export async function askProjectOptions(defaultName) {
    let cancelled = false
    const answers = await prompts(
        [
            {
                type: 'text',
                name: 'projectName',
                message: 'Как будет называться проект?',
                initial: defaultName,
                validate: value =>
                    isValidProjectName(value) ||
                    'Допустимы строчные латинские буквы, цифры и дефис.'
            },
            ...optionalDependencies.map(createDependencyQuestion),
            {
                type: 'confirm',
                name: 'install',
                message: 'Установить npm-зависимости сейчас?',
                initial: true
            }
        ],
        {
            onCancel: () => {
                cancelled = true
                printCancelled()
                return false
            }
        }
    )

    if (cancelled) return null

    return {
        projectName: answers.projectName,
        install: answers.install,
        dependencies: optionalDependencies
            .filter((_, index) => answers[`dependency_${index}`])
            .map(normalizeDependency)
    }
}
