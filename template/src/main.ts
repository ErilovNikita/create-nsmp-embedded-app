import {createApp} from 'vue'
import App from './App.vue'
import '@iframe-resizer/child'
import { createInitVariableFromEnv,initializeJsApi} from '@minitwiks/js-api'

import './styles/global.css'

const mock = {} 
const params = createInitVariableFromEnv(import.meta.env)

initializeJsApi(mock, params)
  .then(jsApi => {
    const app = createApp(App)

    app.provide('jsApi', jsApi)
    app.mount('#app')
  })
  .catch((error: unknown) => {
    console.error(error)
  })