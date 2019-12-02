import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/user'

let userStore: UserModule

function initializeStores(store: Store<any>): void {
  userStore = getModule(UserModule, store)
}

export { initializeStores, userStore }
