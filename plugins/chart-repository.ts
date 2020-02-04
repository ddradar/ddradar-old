import { Level } from '~/types/level'
import { PlayStyle } from '~/types/play-style'
import { isStepChart, StepChart } from '~/types/step-chart'

export const chartVersion = 20200127

export const fetchSongCharts = async (
  songId: string,
  useMaster: boolean = false
) =>
  (await fetchChartJson(useMaster))
    .filter((c) => c.songId === songId)
    .sort((l, r) =>
      l.playStyle !== r.playStyle
        ? l.playStyle - r.playStyle
        : l.difficulty - r.difficulty
    )

export const fetchChartsByLevel = async (
  playStyle: PlayStyle,
  level: Level,
  useMaster: boolean = false
) =>
  (await fetchChartJson(useMaster))
    .filter((c) => c.level === level && c.playStyle === playStyle)
    .sort((l, r) =>
      l.songName < r.songName
        ? -1
        : l.songName > r.songName
        ? 1
        : l.difficulty - r.difficulty
    )

const masterUrl = 'https://staging.ddradar.app'
const fetchChartJson = async (useMaster: boolean) => {
  const jsonUrl = `${useMaster ? masterUrl : ''}/chart.json`
  const jsonData = await (await fetch(jsonUrl)).json()
  if (Array.isArray(jsonData) && isStepChart(jsonData[0]))
    return jsonData as StepChart[]
  throw new Error('JSON file is not StepChart[]')
}
