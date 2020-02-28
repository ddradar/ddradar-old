import * as fs from 'fs'
import { matchersWithOptions } from 'jest-json-schema'
import * as path from 'path'

import chartSchema from '~/static/chart-schema.json'

expect.extend(
  matchersWithOptions({
    schemas: [chartSchema]
  })
)

describe('chart-schema.json', () => {
  test('should be valid json-schema', () => {
    expect(chartSchema).toBeValidSchema()
  })
})

describe('song-info/data/charts/*.json', () => {
  const chartsDirPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'song-info',
    'data',
    'charts'
  )
  const jsonFilesPath = fs
    .readdirSync(chartsDirPath)
    .filter((p) => path.extname(p) === '.json')
  const jsonStrings = jsonFilesPath.map((filePath) => {
    return fs.readFileSync(path.join(chartsDirPath, filePath), 'utf8')
  })
  test.each(jsonStrings)('should be valid json', (s) => {
    const jsonObject = JSON.parse(s)
    expect(jsonObject).toMatchSchema(chartSchema)
  })
})
