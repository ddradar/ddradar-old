import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import UserModule from '@/store/user'

// eslint-disable-next-line import/no-mutable-exports
let userStore: UserModule

function initializeStores(store: Store<any>): void {
  userStore = getModule(UserModule, store)
}

export { initializeStores, userStore }
