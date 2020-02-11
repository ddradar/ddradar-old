import { hasProperty, hasStringProperty, hasNumberProperty } from '../test/util'
import { Difficulty, isDifficulty } from './difficulty'
import { Level, isLevel } from './level'
import { PlayStyle, isPlayStyle } from './play-style'

export type StepChart = {
  /** Song's id. */
  songId: string
  /** Song's Name. */
  songName: string
  /** Single:1 or Double:2 */
  playStyle: PlayStyle
  /** Chart's Difficulty (Beginner:0 - Challenge:4). */
  difficulty: Difficulty
  /** Chart's Level (1-20). */
  level: Level
  /** Step Note's count (Jump = 1 count). */
  notes: number
  /** Freeze Arrow's count. */
  freezeArrow: number
  /** Shock Arrow's count. */
  shockArrow: number
  /** Groove Radar STREAM */
  stream: number
  /** Groove Radar VOLTAGE */
  voltage: number
  /** Groove Radar AIR */
  air: number
  /** Groove Radar FREEZE */
  freeze: number
  /** Groove Radar CHAOS */
  chaos: number
  /** version for diff (yyyymmdd) */
  version: number
}

export function isStepChart(object: unknown): object is StepChart {
  return (
    typeof object === 'object' &&
    object !== null &&
    hasStringProperty(object, 'songId') &&
    hasStringProperty(object, 'songName') &&
    hasProperty(object, 'playStyle') &&
    isPlayStyle(object.playStyle) &&
    hasProperty(object, 'difficulty') &&
    isDifficulty(object.difficulty) &&
    hasProperty(object, 'level') &&
    isLevel(object.level) &&
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
