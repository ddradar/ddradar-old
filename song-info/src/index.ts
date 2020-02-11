/* eslint-disable no-console */
import * as fs from 'fs'
import * as path from 'path'
import { fetchDbVersion, setDbVersion } from './firebase-admin'
import { isSong, Song } from './song'
import { isStepChart, StepChart } from './step-chart'

function readJsonFromDirectory(dirPath: string) {
  const jsonFilePaths = fs.readdirSync(dirPath)
  return jsonFilePaths.map((fileName) => {
    return JSON.parse(fs.readFileSync(path.join(dirPath, fileName), 'utf8'))
  })
}

;(async () => {
  const version = await fetchDbVersion()

  let latestSongVersion = version.songVersion
  let latestChartVersion = version.chartVersion

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
      if (latestSongVersion < song.version) {
        latestSongVersion = song.version
      }
    }
  }
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'song.json'),
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
        continue
      }
      allChartJsonData.push(chart)
      if (latestChartVersion < chart.version) {
        latestChartVersion = chart.version
      }
    }
  }
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'chart.json'),
    JSON.stringify(allChartJsonData, undefined, '  ')
  )

  await setDbVersion({
    songVersion: latestSongVersion,
    chartVersion: latestChartVersion
  })
  console.log('Finished.')
  console.log(
    `SongVersion: ${latestSongVersion} ChartVersion: ${latestChartVersion}`
  )
})().catch((e) => {
  throw e
})
