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

async function updateEnvLocal(targetDir, projectName) {
    const envLocalPath = path.join(targetDir, '.env.local')
    let envLocal = ''

    try {
        envLocal = await fs.readFile(envLocalPath, 'utf8')
    } catch (error) {
        if (error.code !== 'ENOENT') throw error
    }

    const appCode = `VITE_APP_CODE=${projectName}`
    const updatedEnv = /^VITE_APP_CODE=.*$/m.test(envLocal)
        ? envLocal.replace(/^VITE_APP_CODE=.*$/m, appCode)
        : `${envLocal.trimEnd()}${envLocal.trim() ? '\n' : ''}${appCode}\n`

    await fs.writeFile(envLocalPath, updatedEnv)
}

async function restoreTemplateFiles(targetDir) {
    const mappings = [
        ['_gitignore', '.gitignore'],
        ['_github', '.github'],
        ['_gitlab-ci.yml', '.gitlab-ci.yml']
    ]

    await Promise.all(mappings.map(async ([templateName, targetName]) => {
        try {
            await fs.rename(
                path.join(targetDir, templateName),
                path.join(targetDir, targetName)
            )
        } catch (error) {
            if (error.code !== 'ENOENT') throw error
        }
    }))
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
        updateDocumentTitle(targetDir, projectName),
        updateEnvLocal(targetDir, projectName),
        restoreTemplateFiles(targetDir)
    ])
}
