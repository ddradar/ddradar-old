export enum Difficulty {
  Beginner,
  Basic,
  Difficult,
  Expert,
  Challenge
}

export const DifficultyList = [
  {
    id: Difficulty.Beginner,
    name: Difficulty[Difficulty.Beginner].toUpperCase()
  },
  { id: Difficulty.Basic, name: Difficulty[Difficulty.Basic].toUpperCase() },
  {
    id: Difficulty.Difficult,
    name: Difficulty[Difficulty.Difficult].toUpperCase()
  },
  { id: Difficulty.Expert, name: Difficulty[Difficulty.Expert].toUpperCase() },
  {
    id: Difficulty.Challenge,
    name: Difficulty[Difficulty.Challenge].toUpperCase()
  }
]

export const GetDifficultyName = (difficulty: number) =>
  Difficulty.Beginner <= difficulty && difficulty <= Difficulty.Challenge
    ? Difficulty[difficulty].toUpperCase()
    : 'Unknown'
