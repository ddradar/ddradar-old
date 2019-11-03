<template>
  <section class="section">
    <h1 class="title">DOUBLE {{ level }}</h1>
    <p class="subtitle">
      {{ charts.length == 0 ? 'not found' : `found ${charts.length} charts` }}
    </p>
    <ChartList :loading="isLoading" :charts="charts" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { StepChart } from '~/types/step-chart'
import firebase from '~/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const chartsRef = db.collectionGroup('charts')

@Component({
  components: {
    ChartList: () => import('~/components/ChartList.vue')
  }
})
export default class DoubleLevelPage extends Vue {
  level: number | null = null
  charts: StepChart[] = []
  isLoading = true
  async asyncData({ params }: Context) {
    const level = Number.parseInt(params.id)
    const charts: StepChart[] = []
    try {
      const snapShot = await chartsRef
        .where('playStyle', '==', 2)
        .where('level', '==', level)
        .orderBy('songName')
        .orderBy('difficulty')
        .get()
      snapShot.forEach(doc => charts.push(doc.data() as StepChart))
      return {
        level,
        charts,
        isLoading: false
      }
    } catch (e) {
      console.error(e)
      return {
        level,
        isLoading: false
      }
    }
  }
}
</script>
