<template>
  <section class="section">
    <h1 class="title">
      {{ seriesNameWithPrefix }}
    </h1>
    <p class="subtitle">
      {{ songs.length == 0 ? 'not found' : `found ${songs.length} songs` }}
    </p>
    <SongList :loading="isLoading" :songs="songs" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song } from '@/types/song'
import { SeriesList } from '@/types/series'
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const songsRef = db.collection('version/1/songs')

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  }
})
export default class SeriesPage extends Vue {
  seriesName: string | null = null
  songs: Song[] = []
  isLoading = true
  public get seriesNameWithPrefix() {
    if (this.seriesName == null) {
      return ''
    }
    return this.seriesName.startsWith('DDR')
      ? this.seriesName
      : `DDR ${this.seriesName}`
  }
  async asyncData({ params }: Context) {
    const index = Number.parseInt(params.id)
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
}
</script>
