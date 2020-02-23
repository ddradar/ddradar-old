/* eslint-disable no-console */
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import { isSong, Song } from '../../types/song'
import { isStepChart, StepChart } from '../../types/step-chart'
import { setDbVersion } from './firebase-admin'

const readDirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readJsonFromDirectory = async (dirPath: string) => {
  const jsonFilePaths = await readDirAsync(dirPath)
  return Promise.all(
    jsonFilePaths.map(async (fileName) => {
      const jsonString = await readFileAsync(
        path.join(dirPath, fileName),
        'utf8'
      )
      return JSON.parse(jsonString)
    })
  )
}
;(async () => {
  const rootFolder = path.join(__dirname, '..', '..', '..', '..')
  // Read Songs
  const songsData = await readJsonFromDirectory(
    path.join(rootFolder, 'song-info', 'data', 'songs')
  )
  const allSongJsonData = songsData
    .filter((a) => Array.isArray(a) && a.every((s) => isSong(s)))
    .flat() as Song[]
  const songVersion = allSongJsonData
    .map((s) => s.version)
    .sort((l, r) => r - l)[0]

  await writeFileAsync(
    path.join(rootFolder, 'static', 'song.json'),
    JSON.stringify(allSongJsonData, undefined, '  ')
  )

  // Read Charts
  const chartsData = await readJsonFromDirectory(
    path.join(rootFolder, 'song-info', 'data', 'charts')
  )
  const allChartJsonData = chartsData
    .filter((a) => Array.isArray(a) && a.every((c) => isStepChart(c)))
    .flat() as StepChart[]
  const chartVersion = allChartJsonData
    .map((s) => s.version)
    .sort((l, r) => r - l)[0]

  await writeFileAsync(
    path.join(rootFolder, 'static', 'chart.json'),
    JSON.stringify(allChartJsonData, undefined, '  ')
  )

  await setDbVersion({ songVersion, chartVersion })
  console.log('Finished.')
  console.log(`SongVersion: ${songVersion} ChartVersion: ${chartVersion}`)
})().catch((e) => {
  throw e
})
