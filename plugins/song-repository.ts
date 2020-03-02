import { isSong, Song } from '@/types/song'

export const songVersion = 20200227

export const fetchSongs = async (
  fieldName: keyof Song,
  condition: any,
  useMaster: boolean = false
) =>
  (await fetchSongJson(useMaster))
    .filter((s) => s[fieldName] === condition)
    .sort((l, r) =>
      l.nameIndex !== r.nameIndex
        ? l.nameIndex - r.nameIndex
        : l.nameKana < r.nameKana
        ? -1
        : l.nameKana > r.nameKana
        ? 1
        : 0
    )

export const fetchSongById = async (
  songId: string,
  useMaster: boolean = false
) => {
  const song = (await fetchSongJson(useMaster)).filter((s) => s.id === songId)
  if (song.length > 1) throw new Error(`Duplicated songId: ${songId}`)
  else if (song.length === 0) throw new Error(`Not Found songId: ${songId}`)
  return song[0]
}

const masterUrl = 'https://raw.githubusercontent.com/ddradar/ddradar/master/static'
const fetchSongJson = async (useMaster: boolean) => {
  const jsonUrl = `${useMaster ? masterUrl : ''}/song.json`
  const jsonData = await (await fetch(jsonUrl)).json()
  if (Array.isArray(jsonData) && isSong(jsonData[0])) return jsonData as Song[]
  throw new Error('JSON file is not Song[]')
}
