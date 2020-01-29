import { Context, Plugin } from '@nuxt/types'
import firebase from 'firebase/app'

const firebasePlugin: Plugin = ({ env }: Pick<Context, 'env'>, _) => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: env.apiKey,
      authDomain: env.authDomain,
      databaseURL: env.databaseURL,
      projectId: env.projectId,
      storageBucket: env.storageBucket,
      messagingSenderId: env.messagingSenderId,
      appId: env.appId
    })
  }
}

export default firebasePlugin
