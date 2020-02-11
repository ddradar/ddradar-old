<template>
  <section class="section">
    <h1 class="title">
      {{ song.name }}
    </h1>
    <h2 class="subtitle">{{ song.artist }} / {{ seriesName }}</h2>

    <div class="buttons">
      <b-button
        v-for="(chart, index) in charts"
        :key="index"
        :disabled="index == selectedIndex"
        :outlined="index == selectedIndex"
        :type="getClassName(chart)"
        @click="changeSelected(index)"
      >
        {{ getChartType(chart) }}
      </b-button>
    </div>
    <div v-if="selected" class="content">
      <h3 class="title">
        {{ chartName }}
      </h3>
      <article class="columns">
        <div class="column is-6">
          <GrooveRadar class="image" :chart="selected" />
        </div>
        <div class="column is-6">
          <div class="content">
            <h4 class="title">Chart Objects</h4>
            <table class="table is-bordered is-narrow">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Notes</th>
                  <th>FreezeArrow</th>
                  <th>ShockArrow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ selected.level }}</td>
                  <td>{{ selected.notes }}</td>
                  <td>{{ selected.freezeArrow }}</td>
                  <td>{{ selected.shockArrow }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="content">
            <h4 class="title">Groove Radar</h4>
            <table class="table is-bordered is-narrow">
              <thead>
                <tr>
                  <th>VOLTAGE</th>
                  <th>STREAM</th>
                  <th>AIR</th>
                  <th>FREEZE</th>
                  <th>CHAOS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ selected.voltage }}</td>
                  <td>{{ selected.stream }}</td>
                  <td>{{ selected.air }}</td>
                  <td>{{ selected.freeze }}</td>
                  <td>{{ selected.chaos }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { getDifficultyName, Difficulty } from '@/types/difficulty'
import { PlayStyleList, getPlayStyleName, PlayStyle } from '@/types/play-style'
import { Song } from '@/types/song'
import { getSeriesName } from '@/types/series'
import { StepChart } from '@/types/step-chart'
import { fetchSongCharts } from '@/plugins/chart-repository'
import { fetchSongById } from '@/plugins/song-repository'

@Component({
  components: {
    GrooveRadar: () => import('~/components/GrooveRadar.vue')
  }
})
export default class SongPage extends Vue {
  song: Song = {
    id: '00000000000000000000000000000000',
    name: '曲名',
    nameKana: 'きょくめい',
    nameIndex: 1,
    artist: 'アーティスト',
    minBPM: null,
    maxBPM: null,
    series: 'A20',
    version: 20200101
  }

  charts: StepChart[] = []
  isLoading = true
  selectedIndex: number = 0
  /**
   * Get Song's series title.
   * @return {String} DDR series title
   * @example DDR 1st, DDRMAX
   */
  get seriesName() {
    return getSeriesName(this.song.series)
  }

  /**
   * Get selected chart name.
   * @return {String} playStyle/difficulty (ex. SINGLE/BASIC)
   */
  get chartName() {
    if (this.selected === null) {
      return ''
    }
    const { playStyle, difficulty } = this.selected
    return `${PlayStyleList[playStyle]}/${getDifficultyName(difficulty)}`
  }

  /**
   * Get selected chart.
   */
  get selected() {
    return this.charts.length < this.selectedIndex + 1
      ? null
      : this.charts[this.selectedIndex]
  }

  /**
   * fetch data asynchronous.
   */
  async asyncData({ params }: Pick<Context, 'params'>) {
    const songId = params.id
    const chartId = parseInt(params.chart)
    try {
      const song = await fetchSongById(songId)
      const charts = await fetchSongCharts(songId)
      const chartIndex = SongPage.calcSelectedIndex(chartId, charts.length)
      return {
        song,
        charts,
        isLoading: false,
        selectedIndex: chartIndex
      }
    } catch (e) {
      return {
        isLoading: false
      }
    }
  }

  /**
   * @return {String} Chart type.(ex. SP-BASIC)
   */
  getChartType({
    playStyle,
    difficulty
  }: Pick<StepChart, 'playStyle' | 'difficulty'>) {
    return `${getPlayStyleName(playStyle)}-${getDifficultyName(difficulty)}`
  }

  /**
   * @return {String} css class name.(ex. is-basic)
   */
  getClassName({ difficulty }: Pick<StepChart, 'difficulty'>) {
    return `is-${getDifficultyName(difficulty).toLowerCase()}`
  }

  /**
   * Change selected chart.
   */
  changeSelected(index: number) {
    this.selectedIndex = index
  }

  /**
   * Calcurate selectedIndex from URL Path and charts length.
   * @param {number} chartId URL Path (2nd digit means playStyle, and 1st digit means difficulty)
   * @param {number} length charts length
   * @returns {number} The index of chart specified by chartId
   */
  static calcSelectedIndex(chartId: number, length: number) {
    if ([10, 11, 12, 13, 14, 21, 22, 23, 24].includes(chartId)) {
      chartId -= 10
      const playStyle = Math.floor(chartId / 10) as PlayStyle
      const difficulty = (chartId % 10) as Difficulty
      return length === 1 // Only 1 chart(Lesson by DJ)
        ? 0
        : length === 2 // Only Challenge chart(ex. X-Special)
        ? playStyle
        : length === 7 && difficulty !== 4 // Charts except Challenge
        ? difficulty + playStyle * 3
        : length === 9 // Charts include Challenge
        ? difficulty + playStyle * 4
        : 0
    }
    return 0
  }
}
</script>
