<template>
  <section class="section">
    <h1 class="title">
      {{ seriesNameWithPrefix }}
    </h1>
    <div class="buttons">
      <b-button
        v-for="(title, index) in seriesList"
        :key="index"
        :to="`/series/${index}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="title == seriesName"
        :outlined="title == seriesName"
      >
        {{ title }}
      </b-button>
    </div>
    <p v-if="seriesName != null" class="subtitle">
      {{ songs.length == 0 ? 'not found' : `found ${songs.length} songs` }}
    </p>
    <SongList v-if="seriesName != null" :loading="isLoading" :songs="songs" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song } from '@/types/song'
import { SeriesList, Series, GetSeriesName } from '@/types/series'
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const songsRef = db.collection('version/1/songs')

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  },
  async asyncData({ params }: Context) {
    const index = Number.parseInt(params.id)
    if (isNaN(index)) {
      return {
        seriesName: null,
        isLoading: false
      }
    }
    const seriesName = SeriesList[index]
    const songs: Song[] = []
    try {
      const snapShot = await songsRef
        .where('series', '==', seriesName)
        .orderBy('nameIndex')
        .orderBy('nameKana')
        .get()
      snapShot.forEach(doc => songs.push(doc.data() as Song))
      return {
        seriesName,
        songs,
        isLoading: false
      }
    } catch (e) {
      console.error(e)
      return {
        isLoading: false
      }
    }
  }
})
export default class SeriesPage extends Vue {
  seriesName: Series | null = null
  songs: Song[] = []
  isLoading = true
  watchQuery = true
  seriesList = SeriesList
  public get seriesNameWithPrefix() {
    if (this.seriesName == null) {
      return 'シリーズから探す'
    }
    return GetSeriesName(this.seriesName)
  }
}
</script>
