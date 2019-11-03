import { Difficulty } from './difficulty.enum'
import { PlayStyle } from './play-style.enum'

export interface StepChart {
  /** Song's id. */
  songId: string
  /** Song's Name. */
  songName: string
  /** Single or Double */
  playStyle: PlayStyle
  /** Chart's Difficulty (Beginner - Challenge). */
  difficulty: Difficulty
  /** Chart's Level (1-20). */
  level: number
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
