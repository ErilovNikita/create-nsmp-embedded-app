import fs from 'node:fs/promises'
import path from 'node:path'
import { getPackagePeerDependencies } from './npm.js'

function findTemplateBlock(source) {
    const templateTagPattern = /<\/?template\b[^>]*>/gi
    let depth = 0
    let start = -1
    let openingTagEnd = -1
    let match

    while ((match = templateTagPattern.exec(source)) !== null) {
        const isClosingTag = /^<\//.test(match[0])

        if (!isClosingTag) {
            if (depth === 0) {
                start = match.index
                openingTagEnd = templateTagPattern.lastIndex
            }
            depth += 1
            continue
        }

        if (depth === 0) continue
        depth -= 1

        if (depth === 0) {
            return {
                start,
                end: templateTagPattern.lastIndex,
                content: source.slice(openingTagEnd, match.index)
            }
        }
    }

    return null
}

export async function addSideEffectImport({ targetDir, packageName }) {
    const mainFile = path.join(targetDir, 'src', 'main.ts')
    const source = await fs.readFile(mainFile, 'utf8')
    const importStatement = `import '${packageName}'`

    if (source.split(/\r?\n/).some(line => line.trim() === importStatement)) return

    await fs.writeFile(mainFile, `${importStatement}\n${source}`)
}

export async function setupNsmpVueComponents({
    targetDir,
    packageName = '@minitwiks/nsmp-vue-components',
    version = 'latest',
    loadPeerDependencies = getPackagePeerDependencies
}) {
    const packageJsonPath = path.join(targetDir, 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    const peerDependencies = await loadPeerDependencies(packageName, version)

    packageJson.dependencies ??= {}
    for (const [name, dependencyVersion] of Object.entries(peerDependencies)) {
        packageJson.dependencies[name] ??= dependencyVersion
    }

    await fs.writeFile(
        packageJsonPath,
        `${JSON.stringify(packageJson, null, 2)}\n`
    )

    const mainFile = path.join(targetDir, 'src', 'main.ts')
    let source = await fs.readFile(mainFile, 'utf8')
    const imports = [
        "import Antd from 'ant-design-vue'",
        "import { NsmpVueComponents } from '@minitwiks/nsmp-vue-components'",
        "import '@minitwiks/nsmp-vue-components/style.css'"
    ]

    const missingImports = imports.filter(importStatement =>
        !source.split(/\r?\n/).some(line => line.trim() === importStatement)
    )
    if (missingImports.length > 0) source = `${missingImports.join('\n')}\n${source}`

    const createAppStatement = 'const app = createApp(App)'
    const pluginStatements = ['app.use(Antd)', 'app.use(NsmpVueComponents)']
    const missingPluginStatements = pluginStatements.filter(statement =>
        !source.split(/\r?\n/).some(line => line.trim() === statement)
    )

    if (missingPluginStatements.length > 0) {
        if (!source.includes(createAppStatement)) {
            throw new Error(`Не удалось настроить ${mainFile}: не найден createApp(App)`)
        }

        source = source.replace(createAppStatement, `${createAppStatement}\n\n    ${missingPluginStatements.join('\n    ')}`)
    }

    await fs.writeFile(mainFile, source)

    const appFile = path.join(targetDir, 'src', 'App.vue')
    source = await fs.readFile(appFile, 'utf8')
    const configProviderImport = 'import { ConfigProvider } from "@minitwiks/nsmp-vue-components"'

    if (!/import\s*\{[^}]*\bConfigProvider\b[^}]*\}\s*from\s*['"]@minitwiks\/nsmp-vue-components['"]/.test(source)) {
        const scriptSetupPattern = /<script\s+setup(?:\s[^>]*)?>/

        if (!scriptSetupPattern.test(source)) {
            throw new Error(`Не удалось настроить ${appFile}: не найден блок script setup`)
        }

        source = source.replace(
            scriptSetupPattern,
            scriptSetup => `${scriptSetup}\n${configProviderImport}`
        )
    }

    if (!/<ConfigProvider(?:\s|>)/.test(source)) {
        const templateBlock = findTemplateBlock(source)

        if (!templateBlock) {
            throw new Error(`Не удалось настроить ${appFile}: не найден блок template`)
        }

        const templateLines = templateBlock.content.split('\n')
        while (templateLines[0]?.trim() === '') templateLines.shift()
        while (templateLines.at(-1)?.trim() === '') templateLines.pop()
        const indentation = Math.min(...templateLines
            .filter(line => line.trim())
            .map(line => line.match(/^\s*/)[0].length))
        const wrappedContent = templateLines
            .map(line => line.trim() ? `    ${line.slice(indentation)}` : '')
            .join('\n')

        const wrappedTemplate = `<template>\n  <ConfigProvider>\n${wrappedContent}\n  </ConfigProvider>\n</template>`
        source = `${source.slice(0, templateBlock.start)}${wrappedTemplate}${source.slice(templateBlock.end)}`
    }

    await fs.writeFile(appFile, source)
}

export async function runDependencyCallbacks(dependencies, context) {
    for (const { name, callback } of dependencies) {
        if (typeof callback !== 'function') continue

        await callback({
            ...context,
            packageName: name,
            version: context.versions[name]
        })
    }
}
