<template>
  <section class="section">
    <h1 class="title">{{ pageTitle }}</h1>
    <div class="buttons">
      <b-button
        v-for="(series, index) in seriesList"
        :key="index"
        :to="`/series/${index}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="index == selected"
        :outlined="index == selected"
      >
        {{ series }}
      </b-button>
    </div>
    <p class="subtitle">{{ message }}</p>
    <SongList v-if="selected != null" :loading="isLoading" :songs="songs" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song } from '@/types/song'
import { SeriesList, getSeriesName } from '@/types/series'
import { fetchSongs } from '@/plugins/song-repository'

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  },
  async asyncData({ params }: Context) {
    const index = Number.parseInt(params.id)
    if (isNaN(index)) {
      return {
        isLoading: false
      }
    }
    const selectedSeries = SeriesList[index]
    try {
      const songs = await fetchSongs('series', selectedSeries)
      return {
        selected: index,
        songs,
        isLoading: false
      }
    } catch (e) {
      return {
        isLoading: false
      }
    }
  }
})
export default class SeriesPage extends Vue {
  selected: number | null = null
  songs: Song[] = []
  isLoading = true
  seriesList = SeriesList

  public get pageTitle() {
    if (this.selected == null) {
      return 'シリーズから探す'
    }
    return getSeriesName(SeriesList[this.selected])
  }

  public get message() {
    return this.selected === null
      ? 'シリーズを選択してください'
      : this.songs.length === 0
      ? 'Not Found'
      : `Found ${this.songs.length} songs`
  }
}
</script>
