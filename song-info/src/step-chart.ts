// Port from /types/step-chart.ts
import { hasStringProperty, hasProperty, hasNumberProperty } from './util'

export interface StepChart {
  songId: string
  songName: string
  playStyle: 1 | 2
  difficulty: 0 | 1 | 2 | 3 | 4
  level:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
  notes: number
  freezeArrow: number
  shockArrow: number
  stream: number
  voltage: number
  air: number
  freeze: number
  chaos: number
  version: number
}

export function isStepChart(object: unknown): object is StepChart {
  return (
    typeof object === 'object' &&
    object !== null &&
    hasStringProperty(object, 'songId') &&
    hasStringProperty(object, 'songName') &&
    hasProperty(object, 'playStyle') &&
    (object.playStyle === 1 || object.playStyle === 2) &&
    hasNumberProperty(object, 'notes') &&
    hasNumberProperty(object, 'difficulty') &&
    Number.isInteger(object.difficulty) &&
    object.difficulty >= 0 &&
    object.difficulty <= 4 &&
    hasNumberProperty(object, 'level') &&
    Number.isInteger(object.level) &&
    object.level >= 1 &&
    object.level <= 20 &&
    hasNumberProperty(object, 'notes') &&
    hasNumberProperty(object, 'freezeArrow') &&
    hasNumberProperty(object, 'shockArrow') &&
    hasNumberProperty(object, 'stream') &&
    hasNumberProperty(object, 'voltage') &&
    hasNumberProperty(object, 'air') &&
    hasNumberProperty(object, 'freeze') &&
    hasNumberProperty(object, 'chaos') &&
    hasNumberProperty(object, 'version')
  )
}

export function getChartDocumentId({
  playStyle,
  difficulty
}: Pick<StepChart, 'playStyle' | 'difficulty'>) {
  return `${playStyle === 1 ? 'single' : 'double'}-${
    difficulty === 0
      ? 'beginner'
      : difficulty === 1
      ? 'basic'
      : difficulty === 2
      ? 'difficult'
      : difficulty === 3
      ? 'expert'
      : 'challenge'
  }`
}
