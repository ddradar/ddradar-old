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
    <song-list v-if="selected != null" :loading="isLoading" :songs="songs" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { Song } from '@/types/song'
import { SeriesList, getSeriesName } from '@/types/series'
import { fetchSongs } from '@/plugins/song-repository'

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  }
})
export default class SeriesPage extends Vue {
  selected: number | null = null
  songs: Song[] = []
  isLoading = true
  seriesList = SeriesList

  public get pageTitle() {
    if (
      this.selected === null ||
      !Number.isInteger(this.selected) ||
      this.selected < 0 ||
      this.selected >= SeriesList.length
    ) {
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

  async asyncData({ params }: Context) {
    const index = Number.parseInt(params.id)
    if (isNaN(index) || index >= SeriesList.length) {
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
}
</script>
