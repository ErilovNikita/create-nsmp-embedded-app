<script setup lang="ts">
  import User from './components/User.vue'
  import { goToUrl } from './services/utils.ts'
</script>

<template>
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" @click="goToUrl('https://vite.dev')"/>
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" @click="goToUrl('https://vuejs.org')"/>
    <img src="/typescript.png" class="logo typescript" alt="TypeScript logo" @click="goToUrl('https://typescriptlang.org')"/>
  </div>
  <h1>Vite + Vue + TypeScript</h1>

  <User/>

  <p class="text-muted">This template was developed and supported by <a href="https://github.com/ErilovNikita/create-nsmp-embedded-app">ErilovNikita</a></p>
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
