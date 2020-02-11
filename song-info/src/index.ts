/* eslint-disable no-console */
import * as fs from 'fs'
import * as path from 'path'
import { isSong, Song } from '../../types/song'
import { isStepChart, StepChart } from '../../types/step-chart'
import { setDbVersion } from './firebase-admin'

function readJsonFromDirectory(dirPath: string) {
  const jsonFilePaths = fs.readdirSync(dirPath)
  return jsonFilePaths.map((fileName) => {
    return JSON.parse(fs.readFileSync(path.join(dirPath, fileName), 'utf8'))
  })
}

;(async () => {
  // Read Songs
  const songsData = readJsonFromDirectory(
    path.join(__dirname, '..', 'data', 'songs')
  )
  const allSongJsonData = songsData
    .filter((a) => Array.isArray(a) && a.every((s) => isSong(s)))
    .flat() as Song[]
  const songVersion = allSongJsonData
    .map((s) => s.version)
    .sort((l, r) => r - l)[0]

  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'song.json'),
    JSON.stringify(allSongJsonData, undefined, '  ')
  )

  // Read Charts
  const chartsData = readJsonFromDirectory(
    path.join(__dirname, '..', 'data', 'charts')
  )
  const allChartJsonData = chartsData
    .filter((a) => Array.isArray(a) && a.every((c) => isStepChart(c)))
    .flat() as StepChart[]
  const chartVersion = allChartJsonData
    .map((s) => s.version)
    .sort((l, r) => r - l)[0]

  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'chart.json'),
    JSON.stringify(allChartJsonData, undefined, '  ')
  )

  await setDbVersion({ songVersion, chartVersion })
  console.log('Finished.')
  console.log(`SongVersion: ${songVersion} ChartVersion: ${chartVersion}`)
})().catch((e) => {
  throw e
})
