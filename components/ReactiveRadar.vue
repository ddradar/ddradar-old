<script lang="ts">
import { Mixins } from 'vue-property-decorator'
import { Component, Prop } from 'nuxt-property-decorator'
import Chart from 'chart.js'
import { Radar, mixins } from 'vue-chartjs'

@Component({})
export default class ReactiveRadar extends Mixins(Radar, mixins.reactiveProp) {
  @Prop() public chartData!: Chart.ChartData
  @Prop() public chartOptions!: Chart.ChartOptions
  public mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
