<template>
  <div>
    <b-navbar class="is-primary">
      <template slot="brand">
        <b-navbar-item href="/">
          DDRadar
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item href="/series/">
          シリーズから探す
        </b-navbar-item>
        <b-navbar-item href="/name/">
          曲名から探す
        </b-navbar-item>
        <b-navbar-item href="/single/">
          SINGLEのレベルから探す
        </b-navbar-item>
        <b-navbar-item href="/double/">
          DOUBLEのレベルから探す
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" />
      </template>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script type="ts">
import { Vue } from 'vue-property-decorator'

export default class DefaultLayout extends Vue {
}
</script>
