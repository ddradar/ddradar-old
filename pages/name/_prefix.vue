<template>
  <section class="section">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="buttons">
      <b-button
        v-for="(name, index) in songNameIndex"
        :key="index"
        :to="`/name/${index}`"
        type="is-info"
        tag="nuxt-link"
        :disabled="index == selectedIndex"
        :outlined="index == selectedIndex"
      >
        {{ name }}
      </b-button>
    </div>
    <p v-if="selectedIndex != null" class="subtitle">
      {{ songs.length == 0 ? 'not found' : `found ${songs.length} songs` }}
    </p>
    <p v-else class="subtitle">
      曲名を選択してください
    </p>
    <SongList
      v-if="selectedIndex != null"
      :loading="isLoading"
      :songs="songs"
    />
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
        selectedIndex: null,
        isLoading: false
      }
    }
    try {
      const songs = await fetchSongs('nameIndex', index)
      return {
        selectedIndex: index,
        songs,
        isLoading: false
      }
    } catch {
      return {
        selectedIndex: index,
        isLoading: false
      }
    }
  }
})
export default class NameIndexPage extends Vue {
  selectedIndex: SongIndex | null = null
  songs: Song[] = []
  isLoading = true
  songNameIndex = SongNameIndex

  get title() {
    return this.selectedIndex === null
      ? '曲名から探す'
      : SongNameIndex[this.selectedIndex]
  }
}
</script>
