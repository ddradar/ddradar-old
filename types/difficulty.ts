export type Difficulty = 0 | 1 | 2 | 3 | 4

export const DifficultyList: { [key in Difficulty]: string } = {
  0: 'BEGINNER',
  1: 'BASIC',
  2: 'DIFFICULT',
  3: 'EXPERT',
  4: 'CHALLENGE'
}

export const getDifficultyName = (difficulty: number) =>
  isDifficulty(difficulty) ? DifficultyList[difficulty] : 'Unknown'

export const isDifficulty = (obj: unknown): obj is Difficulty =>
  obj === 0 || obj === 1 || obj === 2 || obj === 3 || obj === 4
