/* eslint-disable no-process-env */
import { mocked } from 'ts-jest/utils'
import firebase from 'firebase/app'
import { generateRandomString } from '~/test/util'

jest.mock('firebase/app')

describe('plugins/firebase.ts', () => {
  const OLD_ENV = process.env
  const random = () => generateRandomString(10)

  beforeEach(() => {
    process.env = { ...OLD_ENV }
    const keys: (keyof FirebaseOptions)[] = [
      'apiKey',
      'appId',
      'authDomain',
      'databaseURL',
      'messagingSenderId',
      'projectId',
      'storageBucket'
    ]
    keys.forEach((key) => delete process.env[key])
  })

  afterEach(() => {
    // restore process.env
    process.env = OLD_ENV
  })

  describe('default export', () => {
    test('calls firebase.initializeApp()', () => {
      // Arrange
      const options: FirebaseOptions = {
        apiKey: random(),
        authDomain: random(),
        databaseURL: random(),
        projectId: random(),
        storageBucket: random(),
        messagingSenderId: random(),
        appId: random()
      }
      process.env = { ...process.env, ...options }
      const initFunc = mocked(firebase).initializeApp.mock

      // Act
      // eslint-disable-next-line no-unused-expressions
      require('~/plugins/firebase').default

      // Assert
      expect(initFunc.calls.length).toBe(1)
      expect(initFunc.calls[0][0]).toStrictEqual(options)
    })
  })
})

type FirebaseOptions = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}
