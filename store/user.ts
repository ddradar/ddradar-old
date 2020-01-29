import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import firebase from '~/plugins/firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { UserInfo, isUser } from '@/types/user-info'

const db = firebase.firestore()

@Module({ name: 'user', namespaced: true, stateFactory: true })
export default class UserModule extends VuexModule {
  userInfo: UserInfo | null = null

  @Mutation
  setUser(payload: UserInfo) {
    this.userInfo = { ...payload }
  }

  @Mutation
  clearUser() {
    this.userInfo = null
  }

  @Action
  isAuthenticated() {
    return new Promise<boolean>((resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        unsubscribe()
        if (user) {
          await this.fetchUserDb({
            uid: user.uid,
            iconUrl: user.photoURL!
          })
        }
        resolve(!!user)
      })
    })
  }

  @Action
  async signIn(provider: firebase.auth.AuthProvider) {
    this.clearUser()

    const result = await firebase.auth().signInWithPopup(provider)
    if (result.user !== null && result.additionalUserInfo) {
      if (result.additionalUserInfo.isNewUser) {
        // new user
        await this.createUserDb({
          uid: result.user.uid,
          displayName: result.user.displayName!,
          iconUrl: result.user.photoURL!
        })
      } else {
        // exists user
        await this.fetchUserDb({
          uid: result.user.uid,
          iconUrl: result.user.photoURL!
        })
      }
    }
  }

  @Action
  async signInTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    await this.signIn(provider)
  }

  @Action
  async signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    await this.signIn(provider)
  }

  @Action
  async signOut() {
    await firebase.auth().signOut()
    this.clearUser()
  }

  @Action
  async fetchUserDb({ uid, iconUrl }: { uid: string; iconUrl?: string }) {
    if (!uid) {
      return
    }
    const doc = await db
      .collection('version/1/users')
      .doc(uid)
      .get()
    if (!doc.exists) {
      return
    }
    const data = doc.data()
    if (isUser(data)) {
      const user: UserInfo = {
        ...data,
        uid: doc.id,
        iconUrl
      }
      this.setUser(user)
    }
  }

  @Action
  async createUserDb({
    uid,
    displayName,
    iconUrl
  }: {
    uid: string
    displayName: string
    iconUrl: string
  }) {
    if (!uid) {
      return
    }
    const ref = db.collection('version/1/users').doc(uid)
    const doc = await ref.get()
    if (doc.exists) {
      return
    }
    const data: UserInfo = {
      uid,
      ddrCode: 0,
      displayName,
      area: '未設定',
      description: '',
      isPublic: true
    }
    await ref.set(data)
    this.setUser({ ...data, iconUrl })
  }

  @Action
  async updateUserDb(user: UserInfo) {
    const ref = db.collection('version/1/users').doc(user.uid)
    const doc = await ref.get()
    if (doc.exists) {
      await ref.update(user)
      this.setUser(user)
    }
  }
}
