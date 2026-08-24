import path from 'node:path'
import { defaultProjectName, templateDir } from './config.js'
import { runDependencyCallbacks } from './dependencies.js'
import { getLatestPackageVersion, installDependencies } from './npm.js'
import { createProject } from './project.js'
import { askProjectOptions } from './questions.js'
import {
    printCompletion,
    printProgressHeader,
    printStep,
    printWelcome
} from './ui.js'

export async function run(args = process.argv.slice(2)) {
    printWelcome()

    const options = await askProjectOptions(args[0] || defaultProjectName)
    if (!options) return

    const targetDir = path.resolve(process.cwd(), options.projectName)
    printProgressHeader()

    if (options.dependencies.some(({ version }) => !version)) {
        printStep('🔎', 'Проверяем актуальные версии дополнительных пакетов…')
    }

    const dependencies = Object.fromEntries(
        options.dependencies.map(({ name, version }) => [
            name,
            version ?? `^${getLatestPackageVersion(name)}`
        ])
    )

    printStep('🛠️', 'Создаём файлы и настраиваем проект…')
    await createProject({
        templateDir,
        targetDir,
        projectName: options.projectName,
        dependencies
    })

    if (options.dependencies.some(({ callback }) => callback)) {
        printStep('⚙️', 'Применяем настройки выбранных пакетов…')
    }
    await runDependencyCallbacks(options.dependencies, {
        targetDir,
        projectName: options.projectName,
        versions: dependencies
    })

    if (options.install) {
        printStep('📦', 'Устанавливаем npm-зависимости…')
        installDependencies(targetDir)
    }

    printCompletion({
        targetDir,
        projectName: options.projectName,
        installed: options.install
    })
}
