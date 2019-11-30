<template>
  <div>
    <b-navbar class="is-primary">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" to="/">
          DDRadar
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="nuxt-link" to="/series/">
          シリーズから探す
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/name/">
          曲名から探す
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/single/">
          SINGLEのレベルから探す
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/double/">
          DOUBLEのレベルから探す
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="user" tag="div">
          <nuxt-link class="button is-primary" to="/user/">
            <img v-if="user.iconUrl" class="icon" :src="user.iconUrl" />
            <b-icon v-else icon="account" />
            <span>{{ user.displayName }}</span>
          </nuxt-link>
          <b-button type="is-primary" @click="signOut">
            Logout
          </b-button>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <div class="buttons">
            <b-button type="is-info" icon-left="twitter" @click="signInTwitter">
              Login
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '@/store'

@Component
export default class DefaultLayout extends Vue {
  get user() {
    return userStore.userInfo
  }

  async isAuthenticated() {
    const b = await userStore.isAuthenticated()
    return b
  }

  async signInTwitter() {
    await userStore.signInTwitter()
  }

  async signOut() {
    await userStore.signOut()
  }
}
</script>
