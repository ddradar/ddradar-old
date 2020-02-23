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

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          不具合を発見した、または新機能の要望がある場合には、
          <a href="https://twitter.com/nogic1008" target="_blank">
            作者のTwitter
          </a>
          または
          <a href="https://github.com/ddradar/ddradar/issues" target="_blank">
            Githubのissue
          </a>
          にてご報告ください。
        </p>
        <p>version: {{ appVersion }}</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { version } from '@/package.json'
import { userStore } from '@/store'

@Component
export default class DefaultLayout extends Vue {
  appVersion = version
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
