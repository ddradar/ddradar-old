<template>
  <section class="section">
    <h1 class="title">
      {{ selectedIndexName == null ? '曲名から探す' : selectedIndexName }}
    </h1>
    <div class="buttons">
      <b-button
        v-for="d in songNameIndex"
        :key="d.id"
        :to="`/name/${d.id}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="d.name == selectedIndexName"
        :outlined="d.name == selectedIndexName"
      >
        {{ d.name }}
      </b-button>
    </div>
    <p v-if="selectedIndexName != null" class="subtitle">
      {{ songs.length == 0 ? 'not found' : `found ${songs.length} songs` }}
    </p>
    <p v-else class="subtitle">
      曲名を選択してください
    </p>
    <SongList
      v-if="selectedIndexName != null"
      :loading="isLoading"
      :songs="songs"
    />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song, SongNameIndex } from '@/types/song'
import { fetchSongs } from '@/plugins/song-repository'

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  },
  async asyncData({ params }: Context) {
    const index = params.id
    if (!index) {
      return {
        selectedIndexName: null,
        isLoading: false
      }
    }
    const filtered = SongNameIndex.filter(d => d.id === index.toUpperCase())
    if (filtered.length === 0) {
      return {
        selectedIndexName: null,
        isLoading: false
      }
    }
    const selectedIndexName = filtered[0].name
    try {
      const songs = await fetchSongs('nameIndex', index.toUpperCase())
      return {
        selectedIndexName,
        songs,
        isLoading: false
      }
    } catch {
      return {
        selectedIndexName,
        isLoading: false
      }
    }
  }
})
export default class SongIndexPage extends Vue {
  selectedIndexName: string | null = null
  songs: Song[] = []
  isLoading = true
  songNameIndex = SongNameIndex
}
</script>
