import { mocked } from 'ts-jest/utils'
import firebase from 'firebase/app'
import { generateRandomString } from '~/test/util'
import plugin from '~/plugins/firebase'

jest.mock('firebase/app')

describe('plugins/firebase.ts', () => {
  const random = () => generateRandomString(10)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('default export', () => {
    test('is typeof function', () => {
      expect(typeof plugin).toBe('function')
      expect(plugin.length).toBe(2)
    })
    test('calls firebase.initializeApp() if no apps', () => {
      // Arrange
      const envObject = {
        apiKey: random(),
        authDomain: random(),
        databaseURL: random(),
        projectId: random(),
        storageBucket: random(),
        messagingSenderId: random(),
        appId: random()
      }

      // Act
      plugin({ env: envObject } as any, (_1, _2) => {})

      // Assert
      const initFunc = jest.spyOn(firebase, 'initializeApp').mock
      expect(initFunc.calls.length).toBe(1)
      expect(initFunc.calls[0][0]).toStrictEqual(envObject)
    })
    test('calls firebase.initializeApp() if has apps', () => {
      // Arrange
      const envObject = {
        apiKey: random(),
        authDomain: random(),
        databaseURL: random(),
        projectId: random(),
        storageBucket: random(),
        messagingSenderId: random(),
        appId: random()
      }
      mocked(firebase).apps = [{} as firebase.app.App]

      // Act
      plugin({ env: envObject } as any, (_1, _2) => {})

      // Assert
      const initFunc = jest.spyOn(firebase, 'initializeApp').mock
      expect(initFunc.calls.length).toBe(0)
    })
  })
})
