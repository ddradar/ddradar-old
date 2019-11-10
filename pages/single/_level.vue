<template>
  <section class="section">
    <h1 class="title">
      SINGLE {{ selectedLevel == null ? '' : selectedLevel }}
    </h1>
    <div class="buttons">
      <b-button
        v-for="level in 19"
        :key="level"
        :to="`/single/${level}`"
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
import { isLevel, Level } from '@/types/level'
import { StepChart } from '@/types/step-chart'
import { fetchChartsByLevel } from '@/plugins/chart-repository'

@Component({
  components: {
    ChartList: () => import('~/components/ChartList.vue')
  }
})
export default class SingleLevelPage extends Vue {
  selectedLevel: Level | null = null
  charts: StepChart[] = []
  isLoading = true

  async asyncData({ params }: Context) {
    const selectedLevel = Number.parseInt(params.level)
    if (!isLevel(selectedLevel)) {
      return {
        selectedLevel: null,
        isLoading: false
      }
    }
    try {
      const charts = await fetchChartsByLevel(2, selectedLevel)
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
