import prompts from 'prompts'
import {
    isValidProjectName,
    normalizeDependency,
    optionalDependencies
} from './config.js'

export function createDependencyQuestion(dependency, index) {
    const { name } = normalizeDependency(dependency)

    return {
        type: 'confirm',
        name: `dependency_${index}`,
        message: `Добавить ${name} в проект?`,
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
                message: 'Имя проекта:',
                initial: defaultName,
                validate: value =>
                    isValidProjectName(value) ||
                    'Используйте только lowercase, цифры, "-".'
            },
            ...optionalDependencies.map(createDependencyQuestion),
            {
                type: 'confirm',
                name: 'install',
                message: 'Установить зависимости?',
                initial: true
            }
        ],
        {
            onCancel: () => {
                cancelled = true
                console.log('\nСоздание проекта отменено.')
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
