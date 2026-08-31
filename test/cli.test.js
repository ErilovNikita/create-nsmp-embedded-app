import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { isValidProjectName, normalizeDependency } from '../cli/config.js'
import {
    addSideEffectImport,
    runDependencyCallbacks,
    setupNsmpVueComponents
} from '../cli/dependencies.js'
import { createProject } from '../cli/project.js'
import { createDependencyQuestion } from '../cli/questions.js'
import { banner } from '../cli/ui.js'

test('project name accepts only lowercase letters, numbers and dashes', () => {
    assert.equal(isValidProjectName('my-app-2'), true)
    assert.equal(isValidProjectName('My App'), false)
    assert.equal(isValidProjectName('../app'), false)
})

test('banner contains the complete product name', () => {
    assert.match(banner, /_______/)
    assert.match(banner, /______/)
    assert.ok(banner.split('\n').length >= 7)
})

test('createDependencyQuestion creates a unique prompt for a package', () => {
    assert.deepEqual(createDependencyQuestion({ name: '@scope/package', version: '1.2.3' }, 2), {
        type: 'confirm',
        name: 'dependency_2',
        message: 'Подключить дополнительный пакет @scope/package?',
        initial: true
    })
})

test('normalizeDependency supports short and versioned declarations', () => {
    assert.deepEqual(normalizeDependency('nsmp-icons'), { name: 'nsmp-icons' })
    assert.deepEqual(
        normalizeDependency({ name: 'some-package', version: '1.2.3' }),
        { name: 'some-package', version: '1.2.3' }
    )
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
