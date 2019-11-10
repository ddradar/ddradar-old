<template>
  <section class="section">
    <h1 class="title">{{ pageTitle }}</h1>
    <div class="buttons">
      <b-button
        v-for="(name, index) in songNameIndex"
        :key="index"
        :to="`/name/${index}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="index == selected"
        :outlined="index == selected"
      >
        {{ name }}
      </b-button>
    </div>
    <p class="subtitle">{{ message }}</p>
    <SongList v-if="selected != null" :loading="isLoading" :songs="songs" />
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { Song, SongNameIndex, isSongIndex, SongIndex } from '@/types/song'
import { fetchSongs } from '@/plugins/song-repository'

@Component({
  components: {
    SongList: () => import('~/components/SongList.vue')
  },
  async asyncData({ params }: Context) {
    const index = Number.parseInt(params.prefix)

    if (!isSongIndex(index)) {
      return {
        selected: null,
        isLoading: false
      }
    }
    try {
      const songs = await fetchSongs('nameIndex', index)
      return {
        selected: index,
        songs,
        isLoading: false
      }
    } catch {
      return {
        selected: index,
        isLoading: false
      }
    }
  }
})
export default class NameIndexPage extends Vue {
  selected: SongIndex | null = null
  songs: Song[] = []
  isLoading = true
  songNameIndex = SongNameIndex

  get pageTitle() {
    return this.selected === null
      ? '曲名から探す'
      : SongNameIndex[this.selected]
  }

  get message() {
    return this.selected === null
      ? '曲名を選択してください'
      : this.songs.length === 0
      ? 'Not Found'
      : `Found ${this.songs.length} songs`
  }
}
</script>
