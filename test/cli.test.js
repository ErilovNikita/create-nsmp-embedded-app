import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
    isValidProjectName,
    normalizeDependency,
    resolveUtilities
} from '../cli/config.js'
import {
    addSideEffectImport,
    runDependencyCallbacks,
    setupNsmpVueComponents
} from '../cli/dependencies.js'
import {
    addDependencies,
    addUtilities,
    createProject,
    isVueViteProject
} from '../cli/project.js'
import {
    createDependenciesQuestion,
    createUtilitiesQuestion
} from '../cli/questions.js'
import { banner } from '../cli/ui.js'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

test('project name accepts only lowercase letters, numbers and dashes', () => {
    assert.equal(isValidProjectName('my-app-2'), true)
    assert.equal(isValidProjectName('My App'), false)
    assert.equal(isValidProjectName('../app'), false)
})

test('banner contains the complete product name', () => {
    assert.match(banner, /_______/)
    assert.match(banner, /______/)
    assert.ok(banner.split('\n').length >= 7)
    assert.match(banner, new RegExp(`v${packageJson.version.replaceAll('.', '\\.')}`))
})

test('createDependenciesQuestion selects all optional packages by default', () => {
    const question = createDependenciesQuestion()

    assert.equal(question.type, 'multiselect')
    assert.equal(question.name, 'dependencies')
    assert.equal(question.instructions, false)
    assert.equal(typeof question.onRender, 'function')
    assert.deepEqual(question.choices.map(choice => choice.value), [0, 1, 2])
    assert.ok(question.choices.every(choice => choice.selected))
})

test('createUtilitiesQuestion offers utilities without selecting them by default', () => {
    const question = createUtilitiesQuestion()

    assert.equal(question.type, 'multiselect')
    assert.equal(question.name, 'utilities')
    assert.equal(question.instructions, false)
    assert.equal(typeof question.onRender, 'function')
    assert.deepEqual(question.choices.map(choice => choice.value), [
        'environment', 'version', 'theme', 'dispatch', 'platform'
    ])
    assert.ok(question.choices.every(choice => !('selected' in choice)))

    const state = {
        value: question.choices.map(choice => ({
            value: choice.value,
            selected: choice.value === 'theme'
        }))
    }
    question.onState(state)
    assert.equal(state.value.find(choice => choice.value === 'dispatch').selected, true)
})

test('normalizeDependency supports short and versioned declarations', () => {
    assert.deepEqual(normalizeDependency('nsmp-icons'), { name: 'nsmp-icons' })
    assert.deepEqual(
        normalizeDependency({ name: 'some-package', version: '1.2.3' }),
        { name: 'some-package', version: '1.2.3' }
    )
})

test('resolveUtilities includes transitive utility dependencies', () => {
    assert.deepEqual(resolveUtilities(['theme']), ['theme', 'dispatch'])
    assert.deepEqual(resolveUtilities(['environment', 'theme']), [
        'environment',
        'theme',
        'dispatch'
    ])
})

test('runDependencyCallbacks passes generated project context', async () => {
    let receivedContext

    await runDependencyCallbacks(
        [
            { name: 'without-callback' },
            {
                name: 'with-callback',
                callback: async context => {
                    receivedContext = context
                }
            }
        ],
        {
            targetDir: '/tmp/generated-app',
            projectName: 'generated-app',
            versions: { 'with-callback': '1.2.3' }
        }
    )

    assert.deepEqual(receivedContext, {
        targetDir: '/tmp/generated-app',
        projectName: 'generated-app',
        versions: { 'with-callback': '1.2.3' },
        packageName: 'with-callback',
        version: '1.2.3'
    })
})

test('addSideEffectImport adds the package import only once', async t => {
    const targetDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(targetDir, { recursive: true, force: true }))

    const sourceDir = path.join(targetDir, 'src')
    const mainFile = path.join(sourceDir, 'main.ts')
    await fs.mkdir(sourceDir)
    await fs.writeFile(mainFile, "import { createApp } from 'vue'\n")

    const context = { targetDir, packageName: '@iframe-resizer/child' }
    await addSideEffectImport(context)
    await addSideEffectImport(context)

    assert.equal(
        await fs.readFile(mainFile, 'utf8'),
        "import '@iframe-resizer/child'\nimport { createApp } from 'vue'\n"
    )
})

test('setupNsmpVueComponents installs and registers required plugins', async t => {
    const targetDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(targetDir, { recursive: true, force: true }))

    const sourceDir = path.join(targetDir, 'src')
    const mainFile = path.join(sourceDir, 'main.ts')
    const appFile = path.join(sourceDir, 'App.vue')
    await fs.mkdir(sourceDir)
    await fs.writeFile(
        path.join(targetDir, 'package.json'),
        `${JSON.stringify({ dependencies: {} }, null, 2)}\n`
    )
    await fs.writeFile(
        mainFile,
        "import { createApp } from 'vue'\n\nconst app = createApp(App)\napp.mount('#app')\n"
    )
    await fs.writeFile(
        appFile,
        '<script setup lang="ts">\nconst title = \'App\'\n</script>\n\n<template>\n  <h1>{{ title }}</h1>\n  <main>Content</main>\n</template>\n'
    )

    const setupContext = {
        targetDir,
        packageName: '@minitwiks/nsmp-vue-components',
        version: '^1.0.0',
        loadPeerDependencies: async (packageName, version) => {
            assert.equal(packageName, '@minitwiks/nsmp-vue-components')
            assert.equal(version, '^1.0.0')
            return {
                vue: '^3.4.0',
                'ant-design-vue': '^4.2.6'
            }
        }
    }
    await setupNsmpVueComponents(setupContext)
    await setupNsmpVueComponents(setupContext)

    const packageJson = JSON.parse(
        await fs.readFile(path.join(targetDir, 'package.json'), 'utf8')
    )
    const mainSource = await fs.readFile(mainFile, 'utf8')
    const appSource = await fs.readFile(appFile, 'utf8')

    assert.equal(packageJson.dependencies['ant-design-vue'], '^4.2.6')
    assert.equal(packageJson.dependencies.vue, '^3.4.0')
    assert.equal(mainSource.match(/import Antd from 'ant-design-vue'/g).length, 1)
    assert.equal(mainSource.match(/import \{ NsmpVueComponents \}/g).length, 1)
    assert.equal(mainSource.match(/nsmp-vue-components\/style\.css/g).length, 1)
    assert.equal(mainSource.match(/app\.use\(Antd\)/g).length, 1)
    assert.equal(mainSource.match(/app\.use\(NsmpVueComponents\)/g).length, 1)
    assert.equal(
        appSource.match(/import \{ ConfigProvider \} from "@minitwiks\/nsmp-vue-components"/g).length,
        1
    )
    assert.equal(appSource.match(/<ConfigProvider>/g).length, 1)
    assert.equal(appSource.match(/<\/ConfigProvider>/g).length, 1)
    assert.match(
        appSource,
        /<template>\n  <ConfigProvider>\n[\s\S]*<h1>\{\{ title \}\}<\/h1>[\s\S]*<main>Content<\/main>[\s\S]*  <\/ConfigProvider>\n<\/template>/
    )
})

test('setupNsmpVueComponents wraps the complete template with nested template blocks', async t => {
    const targetDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-components-'))
    t.after(() => fs.rm(targetDir, { recursive: true, force: true }))
    await fs.mkdir(path.join(targetDir, 'src'), { recursive: true })
    await fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify({ dependencies: {} }))
    await fs.writeFile(
        path.join(targetDir, 'src', 'main.ts'),
        "import { createApp } from 'vue'\nimport App from './App.vue'\n\nconst app = createApp(App)\n"
    )
    await fs.writeFile(
        path.join(targetDir, 'src', 'App.vue'),
        '<script setup lang="ts">\n</script>\n\n<template>\n  <Modal>\n    <template #footer>Footer</template>\n  </Modal>\n  <main>Content after nested template</main>\n</template>\n'
    )

    await setupNsmpVueComponents({
        targetDir,
        loadPeerDependencies: async () => ({})
    })

    const appSource = await fs.readFile(path.join(targetDir, 'src', 'App.vue'), 'utf8')
    assert.match(
        appSource,
        /<ConfigProvider>[\s\S]*<template #footer>Footer<\/template>[\s\S]*<main>Content after nested template<\/main>[\s\S]*<\/ConfigProvider>/
    )
    assert.equal(appSource.match(/<\/template>/g).length, 2)
})

test('createProject copies and configures the template', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    const sourceDir = path.join(tempDir, 'template')
    const targetDir = path.join(tempDir, 'generated-app')
    await fs.mkdir(path.join(sourceDir, 'node_modules'), { recursive: true })
    await fs.writeFile(
        path.join(sourceDir, 'package.json'),
        JSON.stringify({ name: 'template', dependencies: {} })
    )
    await fs.writeFile(path.join(sourceDir, 'index.html'), '<title>Template</title>')
    await fs.writeFile(
        path.join(sourceDir, '.env.local'),
        'VITE_APP_CODE=template\nVITE_CUSTOM_VALUE=preserved\n'
    )
    await fs.writeFile(path.join(sourceDir, '_gitignore'), '.env.*\nnode_modules/\n')
    await fs.mkdir(path.join(sourceDir, '_github', 'workflows'), { recursive: true })
    await fs.writeFile(
        path.join(sourceDir, '_github', 'workflows', 'nsmp-deploy.yml'),
        'name: Deploy to NSMP\n'
    )
    await fs.writeFile(path.join(sourceDir, '_gitlab-ci.yml'), 'stages: [deploy]\n')
    await fs.writeFile(path.join(sourceDir, 'node_modules', 'ignored'), '')

    await createProject({
        templateDir: sourceDir,
        targetDir,
        projectName: 'generated-app',
        dependencies: {
            'nsmp-icons': '^1.2.3',
            '@scope/package': '^4.5.6'
        }
    })

    const packageJson = JSON.parse(
        await fs.readFile(path.join(targetDir, 'package.json'), 'utf8')
    )
    assert.equal(packageJson.name, 'generated-app')
    assert.equal(packageJson.dependencies['nsmp-icons'], '^1.2.3')
    assert.equal(packageJson.dependencies['@scope/package'], '^4.5.6')
    assert.equal(
        await fs.readFile(path.join(targetDir, 'index.html'), 'utf8'),
        '<title>generated-app</title>'
    )
    assert.equal(
        await fs.readFile(path.join(targetDir, '.env.local'), 'utf8'),
        'VITE_APP_CODE=generated-app\nVITE_CUSTOM_VALUE=preserved\n'
    )
    assert.equal(
        await fs.readFile(path.join(targetDir, '.gitignore'), 'utf8'),
        '.env.*\nnode_modules/\n'
    )
    await assert.rejects(fs.access(path.join(targetDir, '_gitignore')))
    assert.equal(
        await fs.readFile(path.join(targetDir, '.github', 'workflows', 'nsmp-deploy.yml'), 'utf8'),
        'name: Deploy to NSMP\n'
    )
    assert.equal(
        await fs.readFile(path.join(targetDir, '.gitlab-ci.yml'), 'utf8'),
        'stages: [deploy]\n'
    )
    await assert.rejects(fs.access(path.join(targetDir, '_github')))
    await assert.rejects(fs.access(path.join(targetDir, '_gitlab-ci.yml')))
    await assert.rejects(fs.access(path.join(targetDir, 'node_modules')))
})

test('createProject creates .env.local when it is missing from the template', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    const sourceDir = path.join(tempDir, 'template')
    const targetDir = path.join(tempDir, 'generated-app')
    await fs.mkdir(sourceDir)
    await fs.writeFile(path.join(sourceDir, 'package.json'), JSON.stringify({ name: 'template' }))
    await fs.writeFile(path.join(sourceDir, 'index.html'), '<title>Template</title>')

    await createProject({
        templateDir: sourceDir,
        targetDir,
        projectName: 'generated-app'
    })

    assert.equal(
        await fs.readFile(path.join(targetDir, '.env.local'), 'utf8'),
        'VITE_APP_CODE=generated-app\n'
    )
})

test('createProject copies only selected utilities outside the template', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    const sourceDir = path.join(tempDir, 'template')
    const utilitiesDir = path.join(tempDir, 'utilities')
    const targetDir = path.join(tempDir, 'generated-app')
    await fs.mkdir(path.join(utilitiesDir, 'environment'), { recursive: true })
    await fs.mkdir(path.join(utilitiesDir, 'version'), { recursive: true })
    await fs.mkdir(sourceDir)
    await fs.writeFile(path.join(sourceDir, 'package.json'), JSON.stringify({ name: 'template' }))
    await fs.writeFile(path.join(sourceDir, 'index.html'), '<title>Template</title>')
    await fs.writeFile(path.join(utilitiesDir, 'environment', 'index.ts'), 'export const isDev = true\n')
    await fs.writeFile(path.join(utilitiesDir, 'version', 'index.ts'), 'export const version = 1\n')

    await createProject({
        templateDir: sourceDir,
        utilitiesDir,
        utilities: ['environment'],
        targetDir,
        projectName: 'generated-app'
    })

    assert.equal(
        await fs.readFile(path.join(targetDir, 'src', 'utils', 'environment', 'index.ts'), 'utf8'),
        'export const isDev = true\n'
    )
    await assert.rejects(fs.access(path.join(targetDir, 'src', 'utils', 'version')))
})

test('createProject excludes the template development utilities link', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    const sourceDir = path.join(tempDir, 'template')
    const utilitiesDir = path.join(tempDir, 'utilities')
    const targetDir = path.join(tempDir, 'generated-app')
    await fs.mkdir(path.join(sourceDir, 'src'), { recursive: true })
    await fs.mkdir(path.join(utilitiesDir, 'theme'), { recursive: true })
    await fs.writeFile(path.join(sourceDir, 'package.json'), JSON.stringify({ name: 'template' }))
    await fs.writeFile(path.join(sourceDir, 'index.html'), '<title>Template</title>')
    await fs.writeFile(path.join(utilitiesDir, 'theme', 'index.ts'), 'export const theme = true\n')
    await fs.symlink('../../utilities', path.join(sourceDir, 'src', 'utils'))

    await createProject({
        templateDir: sourceDir,
        utilitiesDir,
        utilities: ['theme'],
        targetDir,
        projectName: 'generated-app'
    })

    assert.equal(
        await fs.readFile(path.join(targetDir, 'src', 'utils', 'theme', 'index.ts'), 'utf8'),
        'export const theme = true\n'
    )
    assert.equal((await fs.lstat(path.join(targetDir, 'src', 'utils'))).isSymbolicLink(), false)
})

test('createProject refuses to overwrite an existing directory', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    await assert.rejects(
        createProject({
            templateDir: tempDir,
            targetDir: tempDir,
            projectName: 'existing-app'
        }),
        /Папка уже существует/
    )
})

test('isVueViteProject recognizes projects with dependencies in either package section', async t => {
    const targetDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-vue-vite-'))
    t.after(() => fs.rm(targetDir, { recursive: true, force: true }))
    await fs.writeFile(
        path.join(targetDir, 'package.json'),
        JSON.stringify({ dependencies: { vue: '^3.5.0' }, devDependencies: { vite: '^6.0.0' } })
    )

    assert.equal(await isVueViteProject(targetDir), true)

    await fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify({ dependencies: { vue: '^3.5.0' } }))
    assert.equal(await isVueViteProject(targetDir), false)
})

test('existing project helpers add dependencies and selected utilities without template files', async t => {
    const targetDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-existing-'))
    const localUtilitiesDir = path.join(targetDir, 'library-utilities')
    t.after(() => fs.rm(targetDir, { recursive: true, force: true }))
    await fs.mkdir(path.join(localUtilitiesDir, 'environment'), { recursive: true })
    await fs.writeFile(path.join(localUtilitiesDir, 'environment', 'index.ts'), 'export const isDev = true\n')
    await fs.writeFile(
        path.join(targetDir, 'package.json'),
        JSON.stringify({ dependencies: { vue: '^3.5.0' }, devDependencies: { vite: '^6.0.0' } })
    )

    await addDependencies({ targetDir, dependencies: { 'nsmp-icons': 'latest' } })
    await addUtilities({
        targetDir,
        utilitiesDir: localUtilitiesDir,
        utilities: ['environment']
    })

    const packageJson = JSON.parse(await fs.readFile(path.join(targetDir, 'package.json'), 'utf8'))
    assert.equal(packageJson.dependencies['nsmp-icons'], 'latest')
    assert.equal(
        await fs.readFile(path.join(targetDir, 'src', 'utils', 'environment', 'index.ts'), 'utf8'),
        'export const isDev = true\n'
    )
    await assert.rejects(fs.access(path.join(targetDir, 'index.html')))

    await fs.writeFile(
        path.join(targetDir, 'src', 'utils', 'environment', 'index.ts'),
        'export const existing = true\n'
    )
    await addUtilities({
        targetDir,
        utilitiesDir: localUtilitiesDir,
        utilities: ['environment']
    })
    assert.equal(
        await fs.readFile(path.join(targetDir, 'src', 'utils', 'environment', 'index.ts'), 'utf8'),
        'export const existing = true\n'
    )
})

test('createProject reserves the target directory before copying files', async t => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'nsmp-cli-'))
    t.after(() => fs.rm(tempDir, { recursive: true, force: true }))

    const sourceDir = path.join(tempDir, 'template')
    const targetDir = path.join(tempDir, 'generated-app')
    await fs.mkdir(sourceDir)
    await fs.writeFile(path.join(sourceDir, 'package.json'), JSON.stringify({ name: 'template' }))
    await fs.writeFile(path.join(sourceDir, 'index.html'), '<title>Template</title>')

    const results = await Promise.allSettled([
        createProject({ templateDir: sourceDir, targetDir, projectName: 'generated-app' }),
        createProject({ templateDir: sourceDir, targetDir, projectName: 'generated-app' })
    ])

    assert.equal(results.filter(result => result.status === 'fulfilled').length, 1)
    assert.equal(results.filter(result => result.status === 'rejected').length, 1)
    assert.match(
        results.find(result => result.status === 'rejected').reason.message,
        /Папка уже существует/
    )

    assert.equal(
        JSON.parse(await fs.readFile(path.join(targetDir, 'package.json'), 'utf8')).name,
        'generated-app'
    )
})
