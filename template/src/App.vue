<script setup lang="ts">
import { onMounted, ref } from 'vue'
import User from './components/User.vue'
import { goToUrl } from './services/utils.ts'
import { checkVersion, type VersionCheckResult } from './utils/version'

const version = ref<VersionCheckResult>()
const versionError = ref<string>()

const getErrorMessage = (error: unknown): string => (
  error instanceof Error ? error.message : String(error)
)

const checkAppVersion = async (): Promise<void> => {
  try {
    version.value = await checkVersion({
      service: 'github',
      owner: 'ErilovNikita',
      repo: 'create-nsmp-embedded-app',
    })
  } catch (error) {
    versionError.value = getErrorMessage(error)
  }
}

onMounted(() => {
  void checkAppVersion()
})
</script>

<template>
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" @click="goToUrl('https://vite.dev')" />
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" @click="goToUrl('https://vuejs.org')" />
    <img src="/typescript.png" class="logo typescript" alt="TypeScript logo"
      @click="goToUrl('https://typescriptlang.org')" />
  </div>
  <h1>Vite + Vue + TypeScript</h1>

  <User />

  <p class="text-muted">This template was developed and supported by <a href="https://github.com/ErilovNikita/create-nsmp-embedded-app">ErilovNikita</a></p>

  <div class="version-info text-muted">
    <p v-if="versionError">Не удалось проверить обновления: {{ versionError }}</p>
    <p v-else-if="!version">Проверяем последнюю версию на GitHub...</p>
    <template v-else>
      <p>{{ version.message }}</p>
    </template>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.3s;
  cursor: pointer;
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.logo:hover {
  transform: scale(1.05);
}

.text-muted {
  color: #888;
}
</style>
