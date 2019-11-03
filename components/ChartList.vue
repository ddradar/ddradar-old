<template>
  <b-table
    :data="charts"
    striped
    hoverable
    :loading="loading"
    focusable
    mobile-cards
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
      <b-table-column field="playStyle" label="SP/DP">
        {{ props.row.playStyle }}
      </b-table-column>
      <b-table-column field="difficulty" label="Dif">
        {{ props.row.difficulty }}
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
      <b-table-column field="stream" label="Str" numeric>
        {{ props.row.stream }}
      </b-table-column>
      <b-table-column field="voltage" label="Vol" numeric>
        {{ props.row.voltage }}
      </b-table-column>
      <b-table-column field="air" label="Air" numeric>
        {{ props.row.air }}
      </b-table-column>
      <b-table-column field="freeze" label="Fre" numeric>
        {{ props.row.freeze }}
      </b-table-column>
      <b-table-column field="chaos" label="Cha" numeric>
        {{ props.row.chaos }}
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
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { StepChart } from '~/types/step-chart'

@Component
export default class ChartList extends Vue {
  @Prop() charts!: StepChart[]
  @Prop(Boolean) loading!: boolean
}
</script>
