import { Difficulty } from './difficulty'
import { Level } from './level'
import { PlayStyle } from './play-style'

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
