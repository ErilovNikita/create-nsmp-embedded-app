import { spawnSync } from 'node:child_process'

const semverPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/

function npmView(packageSpec, field) {
    const result = spawnSync('npm', ['view', packageSpec, field, '--json'], {
        encoding: 'utf8'
    })

    if (result.error) {
        throw new Error(`Не удалось запустить npm: ${result.error.message}`)
    }

    if (result.status !== 0) {
        const details = result.stderr?.trim()
        const error = new Error(
            `Не удалось получить ${field} для ${packageSpec} из npm.${details ? `\n${details}` : ''}`
        )
        error.exitCode = result.status ?? 1
        throw error
    }

    try {
        return result.stdout.trim() ? JSON.parse(result.stdout) : undefined
    } catch {
        throw new Error(`npm вернул некорректный ответ для ${packageSpec}.`)
    }
}

export function getLatestPackageVersion(packageName) {
    const result = spawnSync('npm', ['view', packageName, 'version', '--json'], {
        encoding: 'utf8'
    })

    if (result.error) {
        throw new Error(`Не удалось запустить npm: ${result.error.message}`)
    }

    if (result.status !== 0) {
        const details = result.stderr?.trim()
        const error = new Error(
            `Не удалось получить последнюю версию ${packageName} из npm.${details ? `\n${details}` : ''}`
        )
        error.exitCode = result.status ?? 1
        throw error
    }

    let version
    try {
        version = JSON.parse(result.stdout)
    } catch {
        throw new Error(`npm вернул некорректный ответ для ${packageName}.`)
    }

    if (typeof version !== 'string' || !semverPattern.test(version)) {
        throw new Error(`npm вернул некорректную версию ${packageName}.`)
    }

    return version
}

export function getPackagePeerDependencies(packageName, version = 'latest') {
    const packageSpec = `${packageName}@${version}`
    const resolvedVersions = npmView(packageSpec, 'version')
    const resolvedVersion = Array.isArray(resolvedVersions)
        ? resolvedVersions.at(-1)
        : resolvedVersions

    if (typeof resolvedVersion !== 'string' || !semverPattern.test(resolvedVersion)) {
        throw new Error(`npm вернул некорректную версию ${packageSpec}.`)
    }

    const peerDependencies = npmView(
        `${packageName}@${resolvedVersion}`,
        'peerDependencies'
    ) ?? {}

    if (
        typeof peerDependencies !== 'object'
        || Array.isArray(peerDependencies)
        || Object.values(peerDependencies).some(value => typeof value !== 'string')
    ) {
        throw new Error(`npm вернул некорректные peerDependencies для ${packageSpec}.`)
    }

    return peerDependencies
}

export function installDependencies(targetDir) {
    const result = spawnSync('npm', [
        'install',
        '--silent',
        '--no-audit',
        '--no-fund'
    ], {
        cwd: targetDir,
        stdio: 'inherit'
    })

    if (result.error) {
        throw new Error(`Не удалось запустить npm: ${result.error.message}`)
    }

    if (result.status !== 0) {
        const error = new Error('Не удалось установить зависимости.')
        error.exitCode = result.status ?? 1
        throw error
    }
}
