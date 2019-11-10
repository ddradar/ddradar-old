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
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36

export const SongNameIndex: string[] = [
  'あ',
  'か',
  'さ',
  'た',
  'な',
  'は',
  'ま',
  'や',
  'ら',
  'わ',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '数字・記号'
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
    isSongIndex(object.nameIndex) &&
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

export function isSongIndex(object: unknown): object is SongIndex {
  return (
    typeof object === 'number' &&
    Number.isInteger(object) &&
    object >= 0 &&
    object <= 36
  )
}
