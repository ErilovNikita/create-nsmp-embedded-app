import path from 'node:path'
import { defaultProjectName, templateDir } from './config.js'
import { runDependencyCallbacks } from './dependencies.js'
import { getLatestPackageVersion, installDependencies } from './npm.js'
import { createProject } from './project.js'
import { askProjectOptions } from './questions.js'
import { printWelcome } from './ui.js'

export async function run(args = process.argv.slice(2)) {
    printWelcome()

    const options = await askProjectOptions(args[0] || defaultProjectName)
    if (!options) return

    const targetDir = path.resolve(process.cwd(), options.projectName)
    const dependencies = Object.fromEntries(
        options.dependencies.map(({ name, version }) => [
            name,
            version ?? `^${getLatestPackageVersion(name)}`
        ])
    )

    await createProject({
        templateDir,
        targetDir,
        projectName: options.projectName,
        dependencies
    })

    await runDependencyCallbacks(options.dependencies, {
        targetDir,
        projectName: options.projectName,
        versions: dependencies
    })

    if (options.install) installDependencies(targetDir)

    console.log(`
Готово! Проект создан: ${targetDir}

Следующие команды:

  cd ${options.projectName}
  cp example.env .env.development
  npm run dev
`)
}
