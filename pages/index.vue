<template>
  <div>
    <section class="hero is-right">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            DDRadar
          </h1>
          <p class="subtitle">
            DDR Score Tracker
          </p>
        </div>
      </div>
    </section>
    <section
      v-for="(card, index) in cards"
      :key="index"
      class="container is-fluid"
    >
      <b-collapse class="card" aria-id="content">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="content"
        >
          <h3 class="card-header-title">
            {{ card.title }}
          </h3>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content buttons">
            <b-button
              v-for="(link, i) in card.links"
              :key="i"
              class="is-medium"
              tag="nuxt-link"
              :to="link.href"
            >
              {{ link.label }}
            </b-button>
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { SeriesList } from '@/types/series'
import { SongNameIndex } from '@/types/song'

interface Card {
  title: string
  links: { label: string; href: string }[]
}

@Component
export default class Index extends Vue {
  cards: Card[] = [
    {
      title: 'シリーズから探す',
      links: SeriesList.map((d, i) => ({
        label: d,
        href: `/series/${i}`
      }))
    },
    {
      title: '曲名から探す',
      links: SongNameIndex.map((d, i) => ({
        label: d,
        href: `/name/${i}`
      }))
    },
    {
      title: 'SINGLEのレベルから探す',
      links: Array<Card | null>(19)
        .fill(null)
        .map((_, i) => ({
          label: (i + 1).toString(),
          href: `/single/${i + 1}`
        }))
    },
    {
      title: 'DOUBLEのレベルから探す',
      links: Array<Card | null>(19)
        .fill(null)
        .map((_, i) => ({
          label: (i + 1).toString(),
          href: `/double/${i + 1}`
        }))
    }
  ]
}
</script>
