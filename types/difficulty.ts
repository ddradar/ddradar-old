export type Difficulty = 0 | 1 | 2 | 3 | 4

export const DifficultyList: { [key in Difficulty]: string } = {
  0: 'BEGINNER',
  1: 'BASIC',
  2: 'DIFFICULT',
  3: 'EXPERT',
  4: 'CHALLENGE'
}

export function getDifficultyName(difficulty: number) {
  if (isDifficulty(difficulty)) {
    return DifficultyList[difficulty]
  }
  return 'Unknown'
}

export function isDifficulty(object: unknown): object is Difficulty {
  return (
    typeof object === 'number' &&
    (object === 0 ||
      object === 1 ||
      object === 2 ||
      object === 3 ||
      object === 4)
  )
}
