<template>
  <section class="section">
    <h1 class="title">{{ pageTitle }}</h1>
    <div class="buttons">
      <b-button
        v-for="level in 19"
        :key="level"
        :to="`/single/${level}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="level == selected"
        :outlined="level == selected"
      >
        {{ level }}
      </b-button>
    </div>
    <p class="subtitle">{{ message }}</p>
    <chart-list v-if="selected != null" :loading="isLoading" :charts="charts" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import { fetchChartsByLevel } from '@/plugins/chart-repository'
import { isLevel, Level } from '@/types/level'
import { StepChart } from '@/types/step-chart'

@Component({
  components: {
    ChartList: () => import('~/components/ChartList.vue')
  }
})
export default class SingleLevelPage extends Vue {
  selected: Level | null = null
  charts: StepChart[] = []
  isLoading = true

  async asyncData({ params }: Context) {
    const selected = Number.parseInt(params.level)
    if (!isLevel(selected)) {
      return {
        selected: null,
        isLoading: false
      }
    }
    try {
      const charts = await fetchChartsByLevel(1, selected)
      return {
        selected,
        charts,
        isLoading: false
      }
    } catch (e) {
      return {
        selected,
        isLoading: false
      }
    }
  }

  get pageTitle() {
    return this.selected === null
      ? 'SINGLEのレベルから探す'
      : `SINGLE ${this.selected}`
  }

  get message() {
    return this.selected === null
      ? 'レベルを選択してください'
      : this.charts.length === 0
      ? 'Not Found'
      : `Found ${this.charts.length} charts`
  }
}
</script>
