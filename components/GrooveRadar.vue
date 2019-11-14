<template>
  <ReactiveRadar :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Chart from 'chart.js'

@Component({
  components: {
    ReactiveRadar: () => import('~/components/ReactiveRadar.vue')
  }
})
export default class GrooveRadarComponent extends Vue {
  @Prop() chart!: {
    voltage: number
    stream: number
    chaos: number
    air: number
    freeze: number
  }
  get chartOptions() {
    return {
      legend: {
        display: false
      },
      responsive: true,
      scale: {
        ticks: {
          beginAtZero: true,
          max: 200,
          min: 0,
          stepSize: 20
        }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: (item: Chart.ChartTooltipItem, data: Chart.ChartData) => {
            this.renderLabel(item, data)
          }
        }
      }
    }
  }
  get chartData(): Chart.ChartData {
    return {
      labels: ['STREAM', 'CHAOS', 'FREEZE', 'AIR', 'VOLTAGE'],
      datasets: [
        {
          label: 'data',
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          borderColor: 'rgba(0, 192, 192, 0.5)',
          data: this.chart
            ? [
                this.chart.stream,
                this.chart.chaos,
                this.chart.freeze,
                this.chart.air,
                this.chart.voltage
              ]
            : []
        }
      ]
    }
  }
  renderLabel(
    { index }: Pick<Chart.ChartTooltipItem, 'index'>,
    { labels }: Pick<Chart.ChartData, 'labels'>
  ) {
    if (index === undefined || labels === undefined) {
      return ''
    }
    const dataSet = labels[index]

    if (typeof dataSet === 'string') {
      return dataSet
    }
    return dataSet[0]
  }
}
</script>
