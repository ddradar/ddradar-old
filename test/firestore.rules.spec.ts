import * as fs from 'fs'
import * as firebase from '@firebase/testing'

const testName = 'ddradar-rule-test'
const filePath = 'firestore.rules'

describe(testName, () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: testName,
      rules: fs.readFileSync(filePath, 'utf8')
    })
  })
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: testName })
  })
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
  })
  describe('song collection', () => {
    describe('read', () => {
      test('anyone can list songs', async () => {
        const db = createAnonymousDb()
        const songRef = db
          .collection('version/1/songs')
          .where('nameIndex', '==', 2)
        await firebase.assertSucceeds(songRef.get())
      })
      test('anyone can read song data', async () => {
        const db = createAnonymousDb()
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertSucceeds(songRef.get())
      })
    })
    describe('write', () => {
      test('anyone cannot write songs (annonymous)', async () => {
        const db = createAnonymousDb()
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertFails(songRef.set({ songId: 'foo' }))
      })
      test('anyone cannot write songs (authed user)', async () => {
        const db = createAuthedDb({ uid: 'rinon' })
        const songRef = db.collection('version/1/songs').doc('foo')
        await firebase.assertFails(songRef.set({ songId: 'foo' }))
      })
    })
  })
})

function createAnonymousDb(): firebase.firestore.Firestore {
  return firebase.initializeTestApp({ projectId: testName }).firestore()
}

function createAuthedDb(auth: object): firebase.firestore.Firestore {
  return firebase.initializeTestApp({ projectId: testName, auth }).firestore()
}
