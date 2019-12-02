import * as firebaseTest from '@firebase/testing'
import * as repo from '@/plugins/version-repository'

jest.mock('@/plugins/firebase', () => {
  return firebaseTest.initializeTestApp({
    projectId: 'ddradar-versionrepo-test'
  })
})

describe('VersionRepository', () => {
  const db = firebaseTest
    .initializeAdminApp({ projectId: 'ddradar-versionrepo-test' })
    .firestore()
  describe('fetchVersion', () => {
    test('returns StepChart[] if exists', async () => {
      await db.doc('version/1').set({ foo: 'bar' }, { merge: false })
      const fetchedVersion = await repo.fetchVersion()
      expect(fetchedVersion).toStrictEqual({ chartVersion: 0, songVersion: 0 })
    })
    test('returns [] if not exists', async () => {
      const version = { chartVersion: 20190101, songVersion: 20190301 }
      await db.doc('version/1').set(version, { merge: false })
      const fetchedVersion = await repo.fetchVersion()
      expect(fetchedVersion).toStrictEqual(version)
    })
  })
  afterAll(async () => {
    await Promise.all(firebaseTest.apps().map(app => app.delete()))
  })
})
