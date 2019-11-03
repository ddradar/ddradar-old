<template>
  <b-table
    :data="songs"
    striped
    hoverable
    :loading="loading"
    focusable
    mobile-cards
  >
    <template slot-scope="props">
      <b-table-column field="series" label="Series">
        {{ props.row.series }}
      </b-table-column>
      <b-table-column field="name" label="Name">
        <nuxt-link :to="`/song/${props.row.id}`">
          {{ props.row.name }}
        </nuxt-link>
      </b-table-column>
      <b-table-column field="artist" label="Artist">
        {{ props.row.artist }}
      </b-table-column>
      <b-table-column v-if="props.row.minBPM == null" field="bpm" label="BPM">
        ???
      </b-table-column>
      <b-table-column
        v-else-if="props.row.minBPM == props.row.maxBPM"
        field="bpm"
        label="BPM"
      >
        {{ props.row.minBPM }}
      </b-table-column>
      <b-table-column v-else field="bpm" label="BPM">
        {{ props.row.minBPM }}-{{ props.row.maxBPM }}
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
import { Song } from '@/types/song'

@Component
export default class SongList extends Vue {
  @Prop() songs!: Song[]
  @Prop(Boolean) loading!: boolean
}
</script>
