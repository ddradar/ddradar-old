import * as firebase from '@firebase/testing'
import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

export default class FirebaseTestProvider {
  constructor(
    private readonly projectId: string,
    private readonly ruleFilePath: string = 'firestore.rules'
  ) {}

  async loadRules() {
    const rules = await readFileAsync(this.ruleFilePath, 'utf8')
    return firebase.loadFirestoreRules({ projectId: this.projectId, rules })
  }

  getAnonymousDb() {
    return firebase.initializeTestApp({ projectId: this.projectId }).firestore()
  }

  getAuthedDb(auth: object) {
    return firebase
      .initializeTestApp({ projectId: this.projectId, auth })
      .firestore()
  }

  getAdminDb() {
    return firebase
      .initializeAdminApp({ projectId: this.projectId })
      .firestore()
  }

  async deleteAllData() {
    await firebase.clearFirestoreData({ projectId: this.projectId })
  }

  async cleanupAll() {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  }
}
