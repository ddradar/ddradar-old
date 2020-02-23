import courceJson from '~/static/cource.json'
import { Cource, isCource } from '~/types/cource'
import { Difficulty, getDifficultyName } from '~/types/difficulty'
import { getPlayStyleName, PlayStyle } from '~/types/play-style'

export const version = 20190612

export const fetchCource = (
  courceId: string,
  playStyle: PlayStyle,
  difficulty: Difficulty
): Cource => {
  const cource = courceJson.find((c) => c.id === courceId)
  if (cource === undefined) throw new Error(`Not Found Cource Id: ${courceId}`)
  const order = cource.orders.find(
    (o) => o.playStyle === playStyle && o.difficulty === difficulty
  )
  if (order === undefined)
    throw new Error(
      `Not Found ${getPlayStyleName(playStyle)}/${getDifficultyName(
        difficulty
      )} order`
    )
  return {
    id: cource.id,
    name: cource.name,
    playStyle: order.playStyle,
    difficulty: order.difficulty,
    level: order.level,
    chartOrder: order.chartOrder
  } as Cource
}

export const fetchAllCourceList = () =>
  courceJson
    .flatMap((c) =>
      c.orders.map((o) => ({
        ...o,
        id: c.id,
        name: c.name
      }))
    )
    .filter((c) => isCource(c))
