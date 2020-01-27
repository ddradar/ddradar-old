import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'

config()

export type EnvironmentVariables = {
  NODE_ENV: string
  FIREBASE_API_KEY: string
  FIREBASE_AUTH_DOMAIN: string
  FIREBASE_DATABASE_URL: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_STORAGE_BUCKET: string
  FIREBASE_MESSAGING_SENDER_ID: string
  FIREBASE_APP_ID: string
}

/* eslint-disable no-process-env */
export const environments: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY!,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN!,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL!,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET!,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID!
}
/* eslint-enable no-process-env */

/** Validate environments values. */
export const validateEnvironments = ():
  | { valid: true }
  | { valid: false; keys: Extract<keyof EnvironmentVariables, string>[] } => {
  const invalidKeys: string[] = Object.keys(environments).filter((key) => {
    const value: unknown = (environments as any)[key]
    return value === undefined || value === null
  })
  return invalidKeys.length === 0
    ? { valid: true }
    : {
        valid: false,
        keys: invalidKeys as Extract<keyof EnvironmentVariables, string>[]
      }
}

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_, inject) => {
  inject('environments', environments)
}

export default environmentsPlugin
