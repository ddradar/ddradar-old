import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/user'

let userStore: User

function initialiseStores(store: Store<any>): void {
  userStore = getModule(User, store)
}

export { initialiseStores, userStore }
