import * as firebase from '@firebase/testing'
import FirebaseTestProvider from './firebase-test-provider'

const testName = 'ddradar-rule-test'
const filePath = 'firestore.rules'
const provider = new FirebaseTestProvider(testName, filePath)

describe(testName, () => {
  beforeAll(async () => {
    await provider.loadRules()
  })
  afterEach(async () => {
    await provider.deleteAllData()
  })
  afterAll(async () => {
    await provider.cleanupAll()
  })
  describe('version/1/song collection', () => {
    describe('read', () => {
      test('anyone can list songs', async () => {
        const db = provider.getAnonymousDb()
        const songRef = db
          .collection('version/1/songs')
          .where('nameIndex', '==', 2)
        await firebase.assertSucceeds(songRef.get())
      })
      test('anyone can read song data', async () => {
        const db = provider.getAnonymousDb()
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertSucceeds(songRef.get())
      })
    })
    describe('write', () => {
      test('anyone cannot write songs (anonymous)', async () => {
        const db = provider.getAnonymousDb()
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertFails(songRef.set({ songId: 'foo' }))
      })
      test('anyone cannot write songs (authed user)', async () => {
        const db = provider.getAuthedDb({ uid: 'rinon' })
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertFails(songRef.set({ songId: 'foo' }))
      })
    })
  })
  describe('version/1/users', () => {
    const user = 'rinon'
    const otherUser = 'afro'
    beforeAll(async () => {
      const db = provider.getAdminDb()
      const userRef = db.collection('version/1/users').doc(user)
      await userRef.set({ uid: 'rinon', area: '東京', isPublic: true })
    })
    describe('read', () => {
      test('anyone can read user data (anonymous)', async () => {
        const db = provider.getAnonymousDb()
        const userRef = db.collection('version/1/users').doc(user)
        await firebase.assertSucceeds(userRef.get())
      })
      test('anyone can read user data (other user)', async () => {
        const db = provider.getAuthedDb({ uid: otherUser })
        const userRef = db.collection('version/1/users').doc(user)
        await firebase.assertSucceeds(userRef.get())
      })
      test('anyone can read user data (user)', async () => {
        const db = provider.getAuthedDb({ uid: user })
        const userRef = db.collection('version/1/users').doc(user)
        await firebase.assertSucceeds(userRef.get())
      })
    })
    describe('write', () => {
      test('anonymous cannot write user data', async () => {
        const db = provider.getAnonymousDb()
        const userRef = db.collection('version/1/users').doc('anonymous')
        await firebase.assertFails(userRef.set({ foo: 'bar' }))
      })
      test("user cannot write other user's data", async () => {
        const db = provider.getAuthedDb({ uid: otherUser })
        const userRef = db.collection('version/1/users').doc(user)
        await firebase.assertFails(userRef.set({ foo: 'bar' }))
      })
      test('user can write their data', async () => {
        const db = provider.getAuthedDb({ uid: user })
        const userRef = db.collection('version/1/users').doc(user)
        await firebase.assertSucceeds(userRef.set({ foo: 'bar' }))
      })
    })
  })
  describe('version/1/users/{userId}/scores', () => {
    const user = 'rinon'
    const otherUser = 'afro'
    beforeAll(async () => {
      const db = provider.getAdminDb()
      const scoreRef = db
        .collection(`version/1/users/${user}/scores`)
        .doc('songId')
      await scoreRef.set({ score: 1000000 })
    })
    describe('read', () => {
      test('anonymous cannot read user score', async () => {
        const db = provider.getAnonymousDb()
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('songId')
        await firebase.assertFails(scoreRef.get())
      })
      test('anyone can read user data (other user)', async () => {
        const db = provider.getAuthedDb({ uid: otherUser })
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('songId')
        await firebase.assertFails(scoreRef.get())
      })
      test('anyone can read user data (user)', async () => {
        const db = provider.getAuthedDb({ uid: user })
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('songId')
        await firebase.assertSucceeds(scoreRef.get())
      })
    })
    describe('write', () => {
      test('anonymous cannot write user data', async () => {
        const db = provider.getAnonymousDb()
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('anonymous')
        await firebase.assertFails(scoreRef.set({ score: 990000 }))
      })
      test("user cannot write other user's data", async () => {
        const db = provider.getAuthedDb({ uid: otherUser })
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('songId')
        await firebase.assertFails(scoreRef.set({ score: 990000 }))
      })
      test('user can write their data', async () => {
        const db = provider.getAuthedDb({ uid: user })
        const scoreRef = db
          .collection(`version/1/users/${user}/scores`)
          .doc('songId')
        await firebase.assertSucceeds(scoreRef.set({ score: 990000 }))
      })
    })
  })
})
