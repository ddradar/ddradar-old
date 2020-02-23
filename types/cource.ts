import { Difficulty, isDifficulty } from '~/types/difficulty'
import { isLevel, Level } from '~/types/level'
import { isPlayStyle, PlayStyle } from '~/types/play-style'
import { StepChart } from '~/types/step-chart'
import { hasProperty, hasStringProperty } from '~/utils/type-assert'

export type Cource = {
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

export const isCource = (obj: unknown): obj is Cource =>
  hasStringProperty(obj, 'id', 'name') &&
  hasProperty(obj, 'chartOrder', 'playStyle', 'difficulty', 'level') &&
  isPlayStyle(obj.playStyle) &&
  isDifficulty(obj.difficulty) &&
  isLevel(obj.level) &&
  Array.isArray(obj.chartOrder) &&
  obj.chartOrder.every(
    (element) =>
      typeof element === 'object' &&
      element !== null &&
      hasStringProperty(element, 'songId', 'songName') &&
      hasProperty(element, 'playStyle', 'difficulty', 'level') &&
      isPlayStyle(element.playStyle) &&
      isDifficulty(element.difficulty) &&
      isLevel(element.level)
  )
