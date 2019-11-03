<template>
  <div>
    <section class="section">
      <h1 class="title">
        {{ indexName }}
      </h1>
      <p class="subtitle">
        {{ songs.length == 0 ? 'not found' : `found ${songs.length} songs` }}
      </p>
      <SongList :loading="isLoading" :songs="songs" />
    </section>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song, SongNameIndex } from '@/types/song'
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const songsRef = db.collection('version/1/songs')

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  }
})
export default class SongIndexPage extends Vue {
  indexName: string | null = null
  songs: Song[] = []
  isLoading = true
  async asyncData({ params }: Context) {
    const index = params.id.toUpperCase()
    const indexName = SongNameIndex.filter(d => d.id === index)[0].name
    const songs: Song[] = []
    try {
      const snapShot = await songsRef
        .where('nameIndex', '==', index)
        .orderBy('nameKana')
        .get()
      snapShot.forEach(doc => songs.push(doc.data() as Song))
      return {
        indexName,
        songs,
        isLoading: false
      }
    } catch {
      return {
        isLoading: false
      }
    }
  }
}
</script>
