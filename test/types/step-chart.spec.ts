import { isStepChart, StepChart } from '@/types/step-chart'

describe('StepChart', () => {
  const chart: StepChart = {
    songId: '',
    songName: '',
    playStyle: 1,
    difficulty: 1,
    level: 1,
    notes: 90,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 10,
    voltage: 10,
    air: 2,
    freeze: 0,
    chaos: 2,
    version: 20200101
  }
  test.each([
    undefined,
    null,
    1,
    'string',
    {},
    { ...chart, songId: true },
    { ...chart, songName: null },
    { ...chart, playStyle: 3 },
    { ...chart, difficulty: 2.5 },
    { ...chart, level: -1 },
    { ...chart, stream: '10' }
  ])('isStepChart returns false if param is not StepChart.', (obj) =>
    expect(isStepChart(obj)).toBe(false)
  )
  test.each([
    chart,
    { ...chart, stream: 270 }
  ])('isStepChart returns true if param is StepChart.', (obj) =>
    expect(isStepChart(obj)).toBe(true)
  )
})
