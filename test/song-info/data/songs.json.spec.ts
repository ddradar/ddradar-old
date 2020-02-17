import * as fs from 'fs'
import { matchersWithOptions } from 'jest-json-schema'
import * as path from 'path'

import songSchema from '../../../static/song-schema.json'

expect.extend(
  matchersWithOptions({
    schemas: [songSchema]
  })
)

describe('song-schema.json', () => {
  test('should be valid json-schema', () => {
    expect(songSchema).toBeValidSchema()
  })
})

describe('/data/songs/*.json', () => {
  const songsDirPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'song-info',
    'data',
    'songs'
  )
  const jsonFilesPath = fs
    .readdirSync(songsDirPath)
    .filter((p) => path.extname(p) === '.json')
  const jsonStrings = jsonFilesPath.map((filePath) => {
    return fs.readFileSync(path.join(songsDirPath, filePath), 'utf8')
  })
  test.each(jsonStrings)('', (s) => {
    const jsonObject = JSON.parse(s)
    expect(jsonObject).toMatchSchema(songSchema)
  })
})
