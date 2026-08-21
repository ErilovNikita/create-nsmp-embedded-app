<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { goToUrl } from '../services/utils.ts'

const userTitle = ref('')
const userUrl = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    const currentUserUUID = jsApi.getCurrentUser().uuid
    const url =`${jsApi.getAppRestBaseUrl()}/get/${currentUserUUID}?attrs=title`

    const response = await jsApi.requests.json<{title?: string}>({url})
    if ('title' in response) {
      userTitle.value = `👋 Привет, ${response.title ?? ''}!`
      userUrl.value = `${jsApi.getAppBaseUrl()}/operator/#uuid:${currentUserUUID}`
    }

  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  }
})
</script>

<template>
  <div class="card">
    <span v-if="userTitle" class="bloc" @click="goToUrl(userUrl)">{{ userTitle }}</span>
    <span v-if="errorMessage" class="bloc error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
  .bloc {
    display: inline-block;
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: #fff;
    cursor: pointer;
    transition: 0.25s;
  }
  .bloc:hover {
    transform: scale(1.05) !important;
  }
  .error {
    color: #da5656;
  }
</style>
