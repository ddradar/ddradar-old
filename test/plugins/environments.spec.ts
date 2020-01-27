/* eslint-disable no-process-env */
import { Context } from '@nuxt/types'
import { generateRandomString } from '~/test/util'
import { EnvironmentVariables } from '~/plugins/environments'

// mock 'dotenv' to avoid change process.env
jest.mock('dotenv')

describe('plugins/environments.ts', () => {
  const OLD_ENV = process.env
  const random = (count: number) => generateRandomString(count)

  beforeEach(() => {
    // clear cache
    jest.resetModules()

    // load process.env except used for testing
    process.env = { ...OLD_ENV }
    const keys: Extract<keyof EnvironmentVariables, string>[] = [
      'NODE_ENV',
      'FIREBASE_API_KEY',
      'FIREBASE_APP_ID',
      'FIREBASE_AUTH_DOMAIN',
      'FIREBASE_DATABASE_URL',
      'FIREBASE_MESSAGING_SENDER_ID',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_STORAGE_BUCKET'
    ]
    keys.forEach((key) => delete process.env[key])
  })

  afterEach(() => {
    // restore process.env
    process.env = OLD_ENV
  })

  describe('environments', () => {
    test('eqauls process.env value', () => {
      // Arrange
      const nodeEnv = random(10)
      const apiKey = random(10)
      const appId = random(10)
      const authDomain = random(10)
      const databaseUrl = random(20)
      const messagingSenderId = random(12)
      const projectId = random(6)
      const storageBucket = random(8)
      process.env.NODE_ENV = nodeEnv
      process.env.FIREBASE_API_KEY = apiKey
      process.env.FIREBASE_APP_ID = appId
      process.env.FIREBASE_AUTH_DOMAIN = authDomain
      process.env.FIREBASE_DATABASE_URL = databaseUrl
      process.env.FIREBASE_MESSAGING_SENDER_ID = messagingSenderId
      process.env.FIREBASE_PROJECT_ID = projectId
      process.env.FIREBASE_STORAGE_BUCKET = storageBucket

      // Act
      const env = require('~/plugins/environments')
        .environments as EnvironmentVariables

      // Assert
      expect(env.NODE_ENV).toBe(nodeEnv)
      expect(env.FIREBASE_API_KEY).toBe(apiKey)
      expect(env.FIREBASE_APP_ID).toBe(appId)
      expect(env.FIREBASE_AUTH_DOMAIN).toBe(authDomain)
      expect(env.FIREBASE_DATABASE_URL).toBe(databaseUrl)
      expect(env.FIREBASE_MESSAGING_SENDER_ID).toBe(messagingSenderId)
      expect(env.FIREBASE_PROJECT_ID).toBe(projectId)
      expect(env.FIREBASE_STORAGE_BUCKET).toBe(storageBucket)
    })
  })

  describe('validateEnvironments()', () => {
    test('returns { valid: true } if be set process.env', () => {
      // Arrange
      process.env.NODE_ENV = random(10)
      process.env.FIREBASE_API_KEY = random(10)
      process.env.FIREBASE_APP_ID = random(10)
      process.env.FIREBASE_AUTH_DOMAIN = random(10)
      process.env.FIREBASE_DATABASE_URL = random(10)
      process.env.FIREBASE_MESSAGING_SENDER_ID = random(10)
      process.env.FIREBASE_PROJECT_ID = random(10)
      process.env.FIREBASE_STORAGE_BUCKET = random(10)

      // Act
      const returnVal = require('~/plugins/environments').validateEnvironments() as {
        valid: boolean
      }

      // Assert
      expect(returnVal.valid).toBe(true)
    })
    test.each([undefined, null])(
      'returns { valid: false, keys: [key] } if not set process.env',
      (env) => {
        // Arrange
        process.env.NODE_ENV = env!
        process.env.FIREBASE_API_KEY = random(10)
        process.env.FIREBASE_APP_ID = random(10)
        process.env.FIREBASE_AUTH_DOMAIN = env!
        process.env.FIREBASE_DATABASE_URL = random(10)
        process.env.FIREBASE_MESSAGING_SENDER_ID = random(10)
        process.env.FIREBASE_PROJECT_ID = random(10)
        process.env.FIREBASE_STORAGE_BUCKET = random(10)

        // Act
        const returnVal = require('~/plugins/environments').validateEnvironments() as {
          valid: boolean
          keys: Extract<keyof EnvironmentVariables, string>[]
        }

        // Assert
        expect(returnVal.valid).toBe(false)
        expect(returnVal.keys).toContain<keyof EnvironmentVariables>('NODE_ENV')
        expect(returnVal.keys).toContain<keyof EnvironmentVariables>(
          'FIREBASE_AUTH_DOMAIN'
        )
      }
    )
  })

  describe('default export', () => {
    test('is typeof function', () => {
      // Arrange

      // Act
      const environmentPlugin = require('~/plugins/environments').default

      // Assert
      expect(typeof environmentPlugin).toBe('function')
    })
    test('calls inject()', () => {
      // Arrange
      const envObject: EnvironmentVariables = {
        NODE_ENV: random(10),
        FIREBASE_API_KEY: random(10),
        FIREBASE_APP_ID: random(10),
        FIREBASE_AUTH_DOMAIN: random(10),
        FIREBASE_DATABASE_URL: random(10),
        FIREBASE_MESSAGING_SENDER_ID: random(10),
        FIREBASE_PROJECT_ID: random(10),
        FIREBASE_STORAGE_BUCKET: random(10)
      }
      const inject = jest.fn()

      // Act
      process.env.NODE_ENV = envObject.NODE_ENV
      process.env.FIREBASE_API_KEY = envObject.FIREBASE_API_KEY
      process.env.FIREBASE_APP_ID = envObject.FIREBASE_APP_ID
      process.env.FIREBASE_AUTH_DOMAIN = envObject.FIREBASE_AUTH_DOMAIN
      process.env.FIREBASE_DATABASE_URL = envObject.FIREBASE_DATABASE_URL
      process.env.FIREBASE_MESSAGING_SENDER_ID =
        envObject.FIREBASE_MESSAGING_SENDER_ID
      process.env.FIREBASE_PROJECT_ID = envObject.FIREBASE_PROJECT_ID
      process.env.FIREBASE_STORAGE_BUCKET = envObject.FIREBASE_STORAGE_BUCKET
      require('~/plugins/environments').default({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0][0]).toBe('environments')
      expect(inject.mock.calls[0][1]).toStrictEqual(envObject)
    })
  })
})
