// Port from /types/song.ts
import { Series, isSeries } from './series'
import { hasProperty, hasNumberProperty, hasStringProperty } from './util'

export interface Song {
  id: string
  name: string
  /** name furigana ^([A-Z0-9 .ぁ-んー]*)$ */
  nameKana: string
  nameIndex: SongIndex
  artist: string
  series: Series
  /** Displayed min BPM (Beet Per Minutes).  */
  minBPM: number | null
  /** Displayed max BPM (Beet Per Minutes). */
  maxBPM: number | null
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

export function isSong(object: unknown): object is Song {
  return (
    typeof object === 'object' &&
    object !== null &&
    hasStringProperty(object, 'id') &&
    hasStringProperty(object, 'name') &&
    hasStringProperty(object, 'nameKana') &&
    /^([A-Z0-9 .ぁ-んー]*)$/.test(object.nameKana) &&
    hasProperty(object, 'nameIndex') &&
    isSongIndex(object.nameIndex) &&
    hasStringProperty(object, 'artist') &&
    hasProperty(object, 'series') &&
    isSeries(object.series) &&
    hasProperty(object, 'minBPM') &&
    (typeof object.minBPM === 'number' || object.minBPM === null) &&
    hasProperty(object, 'maxBPM') &&
    (typeof object.maxBPM === 'number' || object.maxBPM === null) &&
    hasNumberProperty(object, 'version')
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