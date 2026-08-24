import fs from 'node:fs/promises'
import path from 'node:path'

export async function addSideEffectImport({ targetDir, packageName }) {
    const mainFile = path.join(targetDir, 'src', 'main.ts')
    const source = await fs.readFile(mainFile, 'utf8')
    const importStatement = `import '${packageName}'`

    if (source.split(/\r?\n/).some(line => line.trim() === importStatement)) return

    await fs.writeFile(mainFile, `${importStatement}\n${source}`)
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
