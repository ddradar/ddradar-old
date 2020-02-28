import {
  hasNumberProperty,
  hasProperty,
  hasStringProperty
} from '../utils/type-assert'

import { Difficulty, isDifficulty } from './difficulty'
import { isLevel, Level } from './level'
import { isPlayStyle, PlayStyle } from './play-style'

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

export const isStepChart = (obj: unknown): obj is StepChart =>
  typeof obj === 'object' &&
  obj !== null &&
  hasStringProperty(obj, 'songId', 'songName') &&
  hasProperty(obj, 'playStyle', 'difficulty', 'level') &&
  isPlayStyle(obj.playStyle) &&
  isDifficulty(obj.difficulty) &&
  isLevel(obj.level) &&
  hasNumberProperty(
    obj,
    'notes',
    'freezeArrow',
    'shockArrow',
    'stream',
    'voltage',
    'air',
    'freeze',
    'chaos',
    'version'
  )
