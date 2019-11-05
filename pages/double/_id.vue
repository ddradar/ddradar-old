<template>
  <section class="section">
    <h1 class="title">
      DOUBLE {{ selectedLevel == null ? '' : selectedLevel }}
    </h1>
    <div class="buttons">
      <b-button
        v-for="level in 19"
        :key="level"
        :to="`/double/${level}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="level == selectedLevel"
        :outlined="level == selectedLevel"
      >
        {{ level }}
      </b-button>
    </div>
    <p v-if="selectedLevel != null" class="subtitle">
      {{ charts.length == 0 ? 'not found' : `found ${charts.length} charts` }}
    </p>
    <p v-else class="subtitle">
      レベルを選択してください
    </p>
    <ChartList
      v-if="selectedLevel != null"
      :loading="isLoading"
      :charts="charts"
    />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { StepChart } from '@/types/step-chart'
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const chartsRef = db.collectionGroup('charts')

@Component({
  components: {
    ChartList: () => import('~/components/ChartList.vue')
  }
})
export default class DoubleLevelPage extends Vue {
  selectedLevel: number | null = null
  charts: StepChart[] = []
  isLoading = true

  async asyncData({ params }: Context) {
    const selectedLevel = Number.parseInt(params.id)
    if (isNaN(selectedLevel)) {
      return {
        selectedLevel: null,
        isLoading: false
      }
    }
    try {
      const snapShot = await chartsRef
        .where('playStyle', '==', 2)
        .where('level', '==', selectedLevel)
        .orderBy('songName')
        .orderBy('difficulty')
        .get()
      const charts = snapShot.docs.map(d => d.data() as StepChart)
      return {
        selectedLevel,
        charts,
        isLoading: false
      }
    } catch (e) {
      console.error(e)
      return {
        selectedLevel,
        isLoading: false
      }
    }
  }
}
</script>
