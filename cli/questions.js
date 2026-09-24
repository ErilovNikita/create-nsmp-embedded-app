import prompts from 'prompts'
import {
    isValidProjectName,
    normalizeDependency,
    optionalDependencies,
    optionalUtilities,
    resolveUtilities
} from './config.js'
import { printCancelled } from './ui.js'

function showDescriptions(kleur) {
    if (this.renderDescriptions) return

    const renderOption = this.renderOption.bind(this)
    this.renderOption = (cursor, option, index, arrowIndicator) => {
        const rendered = renderOption(cursor, option, index, arrowIndicator)
        if (cursor === index || !option.description) return rendered

        return `${rendered}${kleur.gray(` - ${option.description}`)}`
    }
    this.renderDescriptions = true
}

function selectRequiredUtilities(state) {
    const selectedUtilities = resolveUtilities(
        state.value.filter(utility => utility.selected).map(utility => utility.value)
    )

    for (const utility of state.value) {
        if (selectedUtilities.includes(utility.value)) utility.selected = true
    }
}

export function createUtilitiesQuestion() {
    return {
        type: 'multiselect',
        name: 'utilities',
        message: 'Какие утилиты добавить в проект?',
        choices: optionalUtilities.map(utility => ({
            title: utility.name,
            description: utility.description,
            value: utility.name
        })),
        instructions: false,
        hint: '- пробел: выбрать, enter: продолжить',
        onRender: showDescriptions,
        onState: selectRequiredUtilities
    }
}

export function createDependenciesQuestion() {
    return {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Какие дополнительные пакеты установить?',
        choices: optionalDependencies.map((dependency, index) => {
            const { name, description } = normalizeDependency(dependency)
            return {
                title: name,
                description,
                value: index,
                selected: true
            }
        }),
        instructions: false,
        hint: '- пробел: выбрать, enter: продолжить',
        onRender: showDescriptions
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
            createUtilitiesQuestion(),
            createDependenciesQuestion(),
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
        dependencies: answers.dependencies.map(index =>
            normalizeDependency(optionalDependencies[index])
        ),
        utilities: resolveUtilities(answers.utilities)
    }
}
