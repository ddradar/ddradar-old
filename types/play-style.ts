export type PlayStyle = 1 | 2

/** PlayStyle - String Mappings. */
export const PlayStyleList: { [key in PlayStyle]: string } = {
  1: 'SINGLE',
  2: 'DOUBLE'
}

export const getPlayStyleName = (playStyle: number) =>
  playStyle === 1 ? 'SP' : playStyle === 2 ? 'DP' : '?'

export const isPlayStyle = (obj: unknown): obj is PlayStyle =>
  obj === 1 || obj === 2
