import fs from 'node:fs/promises'
import path from 'node:path'

async function assertTargetDoesNotExist(targetDir) {
    try {
        await fs.access(targetDir)
    } catch (error) {
        if (error.code === 'ENOENT') return
        throw error
    }

    throw new Error(`Папка уже существует: ${targetDir}`)
}

async function updatePackageJson(targetDir, projectName, dependencies) {
    const packageJsonPath = path.join(targetDir, 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))

    packageJson.name = projectName
    if (Object.keys(dependencies).length > 0) {
        packageJson.dependencies ??= {}
        Object.assign(packageJson.dependencies, dependencies)
    }

    await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

async function updateDocumentTitle(targetDir, projectName) {
    const indexHtmlPath = path.join(targetDir, 'index.html')
    const indexHtml = await fs.readFile(indexHtmlPath, 'utf8')
    const updatedHtml = indexHtml.replace(
        /(<title>)[^<]*(<\/title>)/i,
        `$1${projectName}$2`
    )

    await fs.writeFile(indexHtmlPath, updatedHtml)
}

export async function createProject({
    templateDir,
    targetDir,
    projectName,
    dependencies = {}
}) {
    await assertTargetDoesNotExist(targetDir)
    await fs.cp(templateDir, targetDir, {
        recursive: true,
        filter: source => {
            const relativePath = path.relative(templateDir, source)
            return !relativePath.split(path.sep).includes('node_modules')
        }
    })

    await Promise.all([
        updatePackageJson(targetDir, projectName, dependencies),
        updateDocumentTitle(targetDir, projectName)
    ])
}
