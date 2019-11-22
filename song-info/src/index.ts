import * as fs from 'fs'
import * as path from 'path'
import {
  addSong,
  addStepChart,
  fetchDbVersion,
  setDbVersion
} from './firebase-admin'
import { isSong, Song } from './song'
import { isStepChart, StepChart } from './step-chart'

function readJsonFromDirectory(dirPath: string) {
  const jsonFilePaths = fs.readdirSync(dirPath)
  return jsonFilePaths.map(fileName => {
    return JSON.parse(fs.readFileSync(path.join(dirPath, fileName), 'utf8'))
  })
}

;(async () => {
  const version = await fetchDbVersion()

  let latestSongVersion = version.songVersion
  let latestChartVersion = version.chartVersion
  let songUpdateCount = 0
  let chartUpdateCount = 0

  // Read Songs
  const songsData = readJsonFromDirectory(
    path.join(__dirname, '..', 'data', 'songs')
  )
  const allSongJsonData: Song[] = []
  for (const songs of songsData) {
    if (!Array.isArray(songs)) {
      continue
    }
    for (const song of songs) {
      if (!isSong(song)) {
        continue
      }
      allSongJsonData.push(song)
      if (song.version <= version.songVersion) {
        continue
      }
      await addSong(song)
      songUpdateCount++
      latestSongVersion =
        latestSongVersion >= song.version ? latestSongVersion : song.version
    }
  }
  fs.writeFileSync(
    path.join(__dirname, '..', 'song.json'),
    JSON.stringify(allSongJsonData, undefined, '  ')
  )

  // Read Charts
  const chartsData = readJsonFromDirectory(
    path.join(__dirname, '..', 'data', 'charts')
  )
  const allChartJsonData: StepChart[] = []
  for (const charts of chartsData) {
    if (!Array.isArray(charts)) {
      continue
    }
    for (const chart of charts) {
      if (!isStepChart(chart)) {
        console.log(chart)
        continue
      }
      allChartJsonData.push(chart)
      if (chart.version <= version.chartVersion) {
        continue
      }
      await addStepChart(chart)
      chartUpdateCount++
      latestChartVersion =
        latestChartVersion >= chart.version ? latestChartVersion : chart.version
    }
  }
  fs.writeFileSync(
    path.join(__dirname, '..', 'chart.json'),
    JSON.stringify(allChartJsonData, undefined, '  ')
  )

  await setDbVersion({
    songVersion: latestSongVersion,
    chartVersion: latestChartVersion
  })
  console.log('Finished.')
  console.log(
    `Added or Updated ${songUpdateCount} Songs, ${chartUpdateCount} Charts.`
  )
  console.log(
    `SongVersion: ${latestSongVersion} ChartVersion: ${latestChartVersion}`
  )
})().catch(e => {
  throw e
})
