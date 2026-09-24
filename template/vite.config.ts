import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from "vite-plugin-zip-pack";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const appCode = env.VITE_APP_CODE || process.env.npm_package_name
  const proxyTarget = (env.VITE_APP_REAL_URL || 'http://localhost')
    .replace(/\/+$/, '')
    .replace(/\/sd$/, '')

  const config = {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '0.0.0')
    },
    plugins: [
      vue(),
      zipPack({
        outFileName: `${appCode}-${process.env.npm_package_version}.zip`
      })
    ],
    base: "./",
    server: {
      proxy: {
          "/sd/": {
            target: proxyTarget,
            changeOrigin: true,
            secure: false,
            ws: true
          }
        }
    }
  }

  // if (env.mode === 'production') {
  //   config.plugins.push(
  //     zipPack()
  //   )
  // }

  return defineConfig(config) 
})
