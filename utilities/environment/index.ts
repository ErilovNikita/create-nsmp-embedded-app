import { Environment } from './types'

/**
 * Получить текущее окружение приложения.
 */
export const getEnvironment = (): Environment => {
  return import.meta.env.DEV
    ? Environment.Development
    : Environment.Production
}

/**
 * Текущее окружение приложения.
 */
export const environment: Environment = getEnvironment()

/**
 * Приложение запущено в окружении разработки.
 */
export const isDev = environment === Environment.Development

/**
 * Приложение запущено в production-окружении.
 */
export const isProd = environment === Environment.Production

export { Environment } from './types'
