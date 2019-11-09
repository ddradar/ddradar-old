import { Series, isSeries } from './series'
import { hasProperty } from '@/test/util'

export interface Song {
  id?: string
  name: string
  nameKana: string
  nameIndex: SongIndex
  artist: string
  series: Series
  /** Displayed min BPM (Beet Per Minutes).  */
  minBPM: number | null
  /** Displayed max BPM (Beet Per Minutes). */
  maxBPM: number | null
}

export type SongIndex =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '_'

export const SongNameIndex: { id: SongIndex; name: string }[] = [
  { id: '0', name: 'あ' },
  { id: '1', name: 'か' },
  { id: '2', name: 'さ' },
  { id: '3', name: 'た' },
  { id: '4', name: 'な' },
  { id: '5', name: 'は' },
  { id: '6', name: 'ま' },
  { id: '7', name: 'や' },
  { id: '8', name: 'ら' },
  { id: '9', name: 'わ' },
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
  { id: 'C', name: 'C' },
  { id: 'D', name: 'D' },
  { id: 'E', name: 'E' },
  { id: 'F', name: 'F' },
  { id: 'G', name: 'G' },
  { id: 'H', name: 'H' },
  { id: 'I', name: 'I' },
  { id: 'J', name: 'J' },
  { id: 'K', name: 'K' },
  { id: 'L', name: 'L' },
  { id: 'M', name: 'M' },
  { id: 'N', name: 'N' },
  { id: 'O', name: 'O' },
  { id: 'P', name: 'P' },
  { id: 'Q', name: 'Q' },
  { id: 'R', name: 'R' },
  { id: 'S', name: 'S' },
  { id: 'T', name: 'T' },
  { id: 'U', name: 'U' },
  { id: 'V', name: 'V' },
  { id: 'W', name: 'W' },
  { id: 'X', name: 'X' },
  { id: 'Y', name: 'Y' },
  { id: 'Z', name: 'Z' },
  { id: '_', name: '数字・記号' }
]

export function isSong(object: unknown): object is Song {
  return (
    typeof object === 'object' &&
    object !== null &&
    !(hasProperty(object, 'id') && typeof object.id !== 'string') &&
    hasProperty(object, 'name') &&
    typeof object.name === 'string' &&
    hasProperty(object, 'nameKana') &&
    typeof object.nameKana === 'string' &&
    hasProperty(object, 'nameIndex') &&
    typeof object.nameIndex === 'string' &&
    hasProperty(object, 'artist') &&
    typeof object.artist === 'string' &&
    hasProperty(object, 'series') &&
    isSeries(object.series) &&
    hasProperty(object, 'minBPM') &&
    (typeof object.minBPM === 'number' || object.minBPM === null) &&
    hasProperty(object, 'maxBPM') &&
    (typeof object.maxBPM === 'number' || object.maxBPM === null)
  )
}
