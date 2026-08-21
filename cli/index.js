#!/usr/bin/env node

import prompts from 'prompts'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.resolve(currentDir, '../template')

const args = process.argv.slice(2)
const defaultName = args[0] || 'my-nsmp-app'

const questions = [
    {
        type: 'text',
        name: 'projectName',
        message: 'Имя проекта:',
        initial: defaultName,
        validate: value =>
            /^[a-z0-9-]+$/.test(value) ||
            'Используйте только lowercase, цифры, "-".'
    },
    {
        type: 'confirm',
        name: 'icons',
        message: 'Добавить nsmp-icons в проект?',
        initial: true
    },
    {
        type: 'confirm',
        name: 'install',
        message: 'Установить зависимости?',
        initial: true
    }
]

console.log('\nСоздание NSMP Embedded App')
console.log('Ответьте на несколько вопросов, чтобы настроить новый проект.\n')

const response = await prompts(questions, {
    onCancel: () => {
        console.log('\nСоздание проекта отменено.')
        process.exit(0)
    }
})

if (!response.projectName) process.exit(1)

const targetDir = path.resolve(process.cwd(), response.projectName)

try {
    await fs.access(targetDir)
    console.error(`Папка уже существует: ${targetDir}`)
    process.exit(1)
} catch {
    // Папка отсутствует, можно создавать проект.
}

let iconsVersion
if (response.icons) {
    const result = spawnSync('npm', ['view', 'nsmp-icons', 'version', '--json'], {
        encoding: 'utf8'
    })

    if (result.status !== 0) {
        const errorMessage = result.stderr?.trim()
        console.error(
            `Не удалось получить последнюю версию nsmp-icons из npm.${errorMessage ? `\n${errorMessage}` : ''
            }`
        )
        process.exit(result.status ?? 1)
    }

    iconsVersion = result.stdout.trim().replace(/^"|"$/g, '')

    if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(iconsVersion)) {
        console.error('npm вернул некорректную версию nsmp-icons.')
        process.exit(1)
    }
}

await fs.cp(templateDir, targetDir, {
    recursive: true,
    filter: source => {
        const relativePath = path.relative(templateDir, source)
        return !relativePath.split(path.sep).includes('node_modules')
    }
})

const packageJsonPath = path.join(targetDir, 'package.json')
const packageJson = JSON.parse(
    await fs.readFile(packageJsonPath, 'utf8')
)

packageJson.name = response.projectName

if (response.icons) {
    packageJson.dependencies ??= {}
    packageJson.dependencies['nsmp-icons'] = `^${iconsVersion}`
}

await fs.writeFile(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`
)

const indexHtmlPath = path.join(targetDir, 'index.html')
const indexHtml = await fs.readFile(indexHtmlPath, 'utf8')
const updatedIndexHtml = indexHtml.replace(
    /(<title>)[^<]*(<\/title>)/i,
    `$1${response.projectName}$2`
)

await fs.writeFile(indexHtmlPath, updatedIndexHtml)

if (response.install) {
    const result = spawnSync('npm', ['install'], {
        cwd: targetDir,
        stdio: 'inherit'
    })

    if (result.status !== 0) {
        process.exit(result.status ?? 1)
    }
}

console.log(`
Готово! Проект создан: ${targetDir}

Следующие команды:

  cd ${response.projectName}
  cp example.env .env.development
  npm run dev
`)