import { Difficulty, isDifficulty } from './difficulty'
import { Level, isLevel } from './level'
import { PlayStyle, isPlayStyle } from './play-style'
import { hasProperty } from '@/test/util'

export interface StepChart {
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
}

export function isStepChart(object: unknown): object is StepChart {
  return (
    typeof object === 'object' &&
    object !== null &&
    hasProperty(object, 'songId') &&
    typeof object.songId === 'string' &&
    hasProperty(object, 'songName') &&
    typeof object.songName === 'string' &&
    hasProperty(object, 'playStyle') &&
    isPlayStyle(object.playStyle) &&
    hasProperty(object, 'difficulty') &&
    isDifficulty(object.difficulty) &&
    hasProperty(object, 'level') &&
    isLevel(object.level) &&
    hasProperty(object, 'notes') &&
    typeof object.notes === 'number' &&
    hasProperty(object, 'freezeArrow') &&
    typeof object.freezeArrow === 'number' &&
    hasProperty(object, 'shockArrow') &&
    typeof object.shockArrow === 'number' &&
    hasProperty(object, 'stream') &&
    typeof object.stream === 'number' &&
    hasProperty(object, 'voltage') &&
    typeof object.voltage === 'number' &&
    hasProperty(object, 'air') &&
    typeof object.air === 'number' &&
    hasProperty(object, 'freeze') &&
    typeof object.freeze === 'number' &&
    hasProperty(object, 'chaos') &&
    typeof object.chaos === 'number'
  )
}
