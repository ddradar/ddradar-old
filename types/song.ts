import {
  hasNumberProperty,
  hasProperty,
  hasStringProperty
} from '../utils/type-assert'

import { isSeries, Series } from './series'

export type Song = {
  /** ^([01689bdiloqDIOPQ]*){32}$ */
  id: string
  name: string
  /** name furigana ^([A-Z0-9 .ぁ-んー]*)$ */
  nameKana: string
  nameIndex: SongIndex
  artist: string
  series: Series
  /** Displayed min BPM (Beet Per Minutes). */
  minBPM: number | null
  /** Displayed max BPM (Beet Per Minutes). */
  maxBPM: number | null
  /** version for diff (yyyymmdd) */
  version: number
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

export const isSong = (obj: unknown): obj is Song =>
  typeof obj === 'object' &&
  obj !== null &&
  hasStringProperty(obj, 'id', 'name', 'nameKana', 'artist') &&
  /^([A-Z0-9 .ぁ-んー]*)$/.test(obj.nameKana) &&
  hasProperty(obj, 'nameIndex', 'series', 'minBPM', 'maxBPM') &&
  isSongIndex(obj.nameIndex) &&
  isSeries(obj.series) &&
  (typeof obj.minBPM === 'number' || obj.minBPM === null) &&
  (typeof obj.maxBPM === 'number' || obj.maxBPM === null) &&
  hasNumberProperty(obj, 'version')

export const isSongIndex = (obj: unknown): obj is SongIndex =>
  typeof obj === 'number' && Number.isInteger(obj) && obj >= 0 && obj <= 36
