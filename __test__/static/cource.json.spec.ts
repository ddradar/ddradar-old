import * as fs from 'fs'
import { matchersWithOptions } from 'jest-json-schema'
import * as path from 'path'

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

describe('/static/cource.json', () => {
  const jsonFilePath = path.join(__dirname, '..', '..', 'static', 'cource.json')
  const jsonString = fs.readFileSync(jsonFilePath, 'utf8')
  test('should be valid json', () => {
    const jsonObject = JSON.parse(jsonString)
    expect(jsonObject).toMatchSchema(courceSchema)
  })
})
