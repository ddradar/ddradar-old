import * as fs from 'fs'
import * as path from 'path'
import { matchersWithOptions } from 'jest-json-schema'

import courceSchema from '@/static/cource-schema.json'

expect.extend(
  matchersWithOptions({
    schemas: [courceSchema]
  })
)

describe('/static/cource-schema.json', () => {
  test('should be valid json-schema', () => {
    expect(courceSchema).toBeValidSchema()
  })
})

describe('/song-info/cource.json', () => {
  const jsonFilePath = path.join(
    __dirname,
    '..',
    '..',
    'song-info',
    'cource.json'
  )
  const jsonString = fs.readFileSync(jsonFilePath, 'utf8')
  test('', () => {
    const jsonObject = JSON.parse(jsonString)
    expect(jsonObject).toMatchSchema(courceSchema)
  })
})
