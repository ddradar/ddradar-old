<template>
  <b-table
    :data="charts"
    striped
    hoverable
    :loading="loading"
    focusable
    :mobile-cards="false"
    paginated
    per-page="50"
  >
    <template slot-scope="props">
      <b-table-column field="songName" label="Name">
        <nuxt-link
          :to="
            `/song/${props.row.songId}/${props.row.playStyle}${props.row.difficulty}`
          "
        >
          {{ props.row.songName }}
        </nuxt-link>
      </b-table-column>
      <b-table-column field="playStyle" label="SP/DP" centered>
        {{ getPlayStyleName(props.row.playStyle) }}
      </b-table-column>
      <b-table-column field="difficulty" label="Dif" centered>
        <span class="tag" :class="getDifficultyClassName(props.row.difficulty)">
          {{ getDifficultyName(props.row.difficulty) }}
        </span>
      </b-table-column>
      <b-table-column field="level" label="Lv" numeric>
        {{ props.row.level }}
      </b-table-column>
      <b-table-column field="notes" label="Notes" numeric>
        {{ props.row.notes }}
      </b-table-column>
      <b-table-column field="freezeArrow" label="FA" numeric>
        {{ props.row.freezeArrow }}
      </b-table-column>
      <b-table-column field="shockArrow" label="SA" numeric>
        {{ props.row.shockArrow }}
      </b-table-column>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { Difficulty, getDifficultyName } from '@/types/difficulty'
import { getPlayStyleName, PlayStyle } from '@/types/play-style'
import { StepChart } from '@/types/step-chart'

@Component
export default class ChartList extends Vue {
  @Prop() charts!: StepChart[]
  @Prop(Boolean) loading!: boolean

  getPlayStyleName(playStyle: PlayStyle) {
    return getPlayStyleName(playStyle)
  }

  getDifficultyName(difficulty: Difficulty) {
    return getDifficultyName(difficulty)
  }

  getDifficultyClassName(difficulty: Difficulty) {
    return 'is-' + getDifficultyName(difficulty).toLowerCase()
  }
}
</script>
