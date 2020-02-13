<template>
  <div v-if="user">
    <section class="hero is-right">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            マイページ
          </h1>
          <p class="subtitle">
            各種設定
          </p>
        </div>
      </div>
    </section>
    <section class="container">
      <b-field label="DDR-CODE">
        <b-input
          v-model="user.ddrCode"
          type="number"
          placeholder="10000000"
          min="10000000"
          max="99999999"
          required
        />
      </b-field>
      <b-field label="表示名">
        <b-input
          v-model="user.displayName"
          minlength="1"
          maxlength="10"
          required
        />
      </b-field>
      <b-field label="所属エリア">
        <b-select v-model="user.area">
          <option v-for="area in areaList" :key="area" :value="area">
            {{ area }}
          </option>
        </b-select>
      </b-field>
      <b-field label="プロフィール">
        <b-input
          v-model="user.description"
          maxlength="50"
          placeholder="50文字まで"
        />
      </b-field>
      <b-field>
        <b-switch v-model="user.isPublic">スコアを公開する</b-switch>
      </b-field>
      <div class="buttons">
        <b-button type="is-primary" @click="updateUserInfo">保存</b-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ToastProgrammatic as Toast } from 'buefy'
import { Component, Vue } from 'nuxt-property-decorator'

import { userStore } from '@/store'
import { AreaList, UserInfo } from '@/types/user-info'

@Component
export default class UserPage extends Vue {
  areaList = AreaList
  user: UserInfo | null = null

  async asyncData() {
    if (await userStore.isAuthenticated()) {
      return { user: { ...userStore.userInfo } }
    }
  }

  async updateUserInfo() {
    if (!this.user) {
      return
    }
    await userStore.updateUserDb(this.user)
    Toast.open('ユーザー情報を保存しました')
  }
}
</script>
