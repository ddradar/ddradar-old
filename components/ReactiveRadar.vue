<script lang="ts">
import Chart from 'chart.js'
import { Component, Prop } from 'nuxt-property-decorator'
import { mixins, Radar } from 'vue-chartjs'
import { Mixins } from 'vue-property-decorator'

@Component({})
export default class ReactiveRadar extends Mixins(Radar, mixins.reactiveProp) {
  @Prop() public chartData!: Chart.ChartData
  @Prop() public chartOptions!: Chart.ChartOptions
  public mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
