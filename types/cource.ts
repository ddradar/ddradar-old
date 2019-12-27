import { PlayStyle, isPlayStyle } from '@/types/play-style'
import { Difficulty, isDifficulty } from '@/types/difficulty'
import { Level, isLevel } from '@/types/level'
import { StepChart } from '@/types/step-chart'
import { hasStringProperty, hasNumberProperty, hasProperty } from '~/test/util'

export interface Cource {
  /** Cource id. (similar to songId) */
  id: string
  name: string
  playStyle: PlayStyle
  difficulty: Difficulty
  level: Level
  chartOrder: Pick<
    StepChart,
    'songId' | 'songName' | 'playStyle' | 'difficulty' | 'level'
  >[]
}

export function isCource(obj: unknown): obj is Cource {
  return (
    hasStringProperty(obj, 'id') &&
    hasStringProperty(obj, 'name') &&
    hasNumberProperty(obj, 'playStyle') &&
    isPlayStyle(obj.playStyle) &&
    hasNumberProperty(obj, 'difficulty') &&
    isDifficulty(obj.difficulty) &&
    hasNumberProperty(obj, 'level') &&
    isLevel(obj.level) &&
    hasProperty(obj, 'chartOrder') &&
    Array.isArray(obj.chartOrder) &&
    obj.chartOrder.every(
      element =>
        typeof element === 'object' &&
        element !== null &&
        hasStringProperty(element, 'songId') &&
        hasStringProperty(element, 'songName') &&
        hasProperty(element, 'playStyle') &&
        isPlayStyle(element.playStyle) &&
        hasProperty(element, 'difficulty') &&
        isDifficulty(element.difficulty) &&
        hasProperty(element, 'level') &&
        isLevel(element.level)
    )
  )
}
