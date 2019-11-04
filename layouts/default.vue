<template>
  <div>
    <b-navbar class="is-primary">
      <template slot="brand">
        <b-navbar-item href="/">
          DDRadar
        </b-navbar-item>
      </template>
      <template slot="start">
        <!-- Search from Series -->
        <b-navbar-item tag="div">
          <b-dropdown hoverable aria-role="list">
            <button slot="trigger" class="button is-primary">
              <span>シリーズから探す</span>
              <b-icon icon="menu-down" />
            </button>
            <b-dropdown-item
              v-for="(series, index) in seriesList"
              :key="series"
              has-link
              aria-role="listitem"
            >
              <nuxt-link :to="`/series/${index}`">
                {{ series }}
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>

        <!-- Search from Song Name -->
        <b-navbar-item tag="div">
          <b-dropdown hoverable aria-role="list">
            <button slot="trigger" class="button is-primary">
              <span>曲名から探す</span>
              <b-icon icon="menu-down" />
            </button>
            <b-dropdown-item custom aria-role="listitem">
              <div class="content buttons">
                <b-button
                  v-for="song in songNameIndex"
                  :key="song.id"
                  :to="`/name/${song.id.toLowerCase()}`"
                  tag="nuxt-link"
                >
                  {{ song.name }}
                </b-button>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>

        <!-- Search from Single Level -->
        <b-navbar-item tag="div">
          <b-dropdown hoverable aria-role="list">
            <button slot="trigger" class="button is-primary">
              <span>SINGLEのレベルから探す</span>
              <b-icon icon="menu-down" />
            </button>

            <b-dropdown-item
              v-for="level in 19"
              :key="level"
              has-link
              aria-role="listitem"
            >
              <nuxt-link :to="`/single/${level}`">
                {{ level }}
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>

        <!-- Search from Double Level -->
        <b-navbar-item tag="div">
          <b-dropdown hoverable aria-role="list">
            <button slot="trigger" class="button is-primary">
              <span>DOUBLEのレベルから探す</span>
              <b-icon icon="menu-down" />
            </button>

            <b-dropdown-item
              v-for="level in 19"
              :key="level"
              has-link
              aria-role="listitem"
            >
              <nuxt-link :to="`/double/${level}`">
                {{ level }}
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" />
      </template>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script type="ts">
import { Vue } from 'vue-property-decorator'
import { SongNameIndex } from '@/types/song'
import { SeriesList } from '@/types/series'

export default class DefaultLayout extends Vue {
  seriesList = SeriesList
  songNameIndex = SongNameIndex
  get songNameDivided() {
    const dividedAt = 6
    const dividedArray = []
    for (let i = 0; i < SongNameIndex.length; i += dividedAt) {
      dividedArray.push(SongNameIndex.slice(i, i + dividedAt))
    }
    return dividedArray
  }
}
</script>
