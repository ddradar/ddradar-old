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
import { getDifficultyName } from '@/types/difficulty'
import { PlayStyleList, getPlayStyleName } from '@/types/play-style'
import { Song } from '@/types/song'
import { GetSeriesName } from '@/types/series'
import { StepChart } from '@/types/step-chart'
import { fetchSongCharts } from '@/plugins/chart-repository'
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

@Component({
  components: {
    GrooveRadar: () => import('~/components/GrooveRadar.vue')
  }
})
export default class SongPage extends Vue {
  song: Song = {
    name: '曲名',
    nameKana: 'きょくめい',
    nameIndex: '1',
    artist: 'アーティスト',
    minBPM: 100,
    maxBPM: 400,
    series: 'A20'
  }
  charts: StepChart[] = []
  isLoading = true
  selectedIndex: number = 0

  /**
   * @param {number} playStyle Single or Double
   * @param {number} difficulty Chart's Difficulty (Beginner - Challenge).
   * @return {String} Chart type.(ex. SP-BASIC)
   */
  public getChartType({ playStyle, difficulty }: StepChart) {
    return `${getPlayStyleName(playStyle)}-${getDifficultyName(difficulty)}`
  }
  /**
   * @param {number} difficulty Chart's Difficulty (Beginner - Challenge).
   * @return {String} css class name.(ex. is-basic)
   */
  public getClassName({ difficulty }: StepChart) {
    return `is-${getDifficultyName(difficulty).toLowerCase()}`
  }
  /**
   * Get Song's series title.
   * @return {String} DDR series (ex. DDR 1st, DDRMAX)
   * 1st -> DDR 1st
   */
  public get seriesName() {
    return GetSeriesName(this.song.series)
  }
  /**
   * Get selected chart name.
   * @return {String} playStyle/difficulty (ex. SINGLE/BASIC)
   */
  public get chartName() {
    if (this.selected === null) {
      return ''
    }
    const { playStyle, difficulty } = this.selected
    return `${PlayStyleList[playStyle]}/${getDifficultyName(difficulty)}`
  }
  /**
   * Get selected chart.
   */
  public get selected() {
    return this.charts.length < this.selectedIndex + 1
      ? null
      : this.charts[this.selectedIndex]
  }
  /**
   * Change selected chart.
   */
  public changeSelected(index: number) {
    this.selectedIndex = index
  }
  /**
   * fetch data asynchronous.
   */
  async asyncData({ params }: Context) {
    const songId = params.id
    const chartId = parseInt(params.chart) - 10
    try {
      const d = await db.doc(`version/1/songs/${songId}`).get()
      const charts = await fetchSongCharts(songId)
      const chartIndex =
        isNaN(chartId) || charts.length === 1 // Not select chart or Only 1 chart(Lesson by DJ)
          ? 0
          : charts.length === 2 // Only Challenge chart(ex. X-Special)
          ? Math.floor(chartId / 10)
          : charts.length === 7 // Charts except Challenge
          ? (chartId % 10) + Math.floor(chartId / 10) * 3
          : charts.length === 9 // Charts include Challenge
          ? (chartId % 10) + Math.floor(chartId / 10) * 4
          : 0

      return {
        song: d.data(),
        charts,
        isLoading: false,
        selectedIndex: chartIndex
      }
    } catch (e) {
      console.error(e)
      return {
        isLoading: false
      }
    }
  }
}
</script>
