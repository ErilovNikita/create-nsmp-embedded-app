import path from 'node:path'
import { defaultProjectName, templateDir, utilitiesDir } from './config.js'
import { runDependencyCallbacks } from './dependencies.js'
import { getLatestPackageVersion, installDependencies } from './npm.js'
import {
    addDependencies,
    addUtilities,
    createProject,
    isVueViteProject
} from './project.js'
import { askExistingProjectOptions, askProjectOptions } from './questions.js'
import {
    printCompletion,
    printProgressHeader,
    printStep,
    printWelcome
} from './ui.js'

export async function run(args = process.argv.slice(2)) {
    printWelcome()

    const currentDir = process.cwd()
    const useCurrentProject = !args[0] && await isVueViteProject(currentDir)
    const options = useCurrentProject
        ? await askExistingProjectOptions()
        : await askProjectOptions(args[0] || defaultProjectName)
    if (!options) return

    const targetDir = useCurrentProject
        ? currentDir
        : path.resolve(currentDir, options.projectName)
    const projectName = useCurrentProject
        ? path.basename(targetDir)
        : options.projectName
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

    printStep('🛠️', useCurrentProject
        ? 'Добавляем зависимости и утилиты NSMP…'
        : 'Создаём файлы и настраиваем проект…')
    if (useCurrentProject) {
        await addDependencies({ targetDir, dependencies })
        await addUtilities({ targetDir, utilitiesDir, utilities: options.utilities })
    } else {
        await createProject({
            templateDir,
            targetDir,
            projectName,
            dependencies,
            utilitiesDir,
            utilities: options.utilities
        })
    }

    if (!useCurrentProject && options.dependencies.some(({ callback }) => callback)) {
        printStep('⚙️', 'Применяем настройки выбранных пакетов…')
    }
    if (!useCurrentProject) {
        await runDependencyCallbacks(options.dependencies, {
            targetDir,
            projectName,
            versions: dependencies
        })
    }

    if (options.install) {
        printStep('📦', 'Устанавливаем npm-зависимости…')
        installDependencies(targetDir)
    }

    printCompletion({ targetDir, projectName, installed: options.install, initialized: useCurrentProject })
}
