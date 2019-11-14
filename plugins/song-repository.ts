import firebase from '@/plugins/firebase'
import 'firebase/firestore'
import { isSong, Song } from '@/types/song'

const db = firebase.firestore()

export async function fetchSongs(fieldName: string, condition: any) {
  const query = db
    .collection('version/1/songs')
    .where(fieldName, '==', condition)

  const querySorted =
    fieldName === 'nameIndex'
      ? query.orderBy('nameKana')
      : query.orderBy('nameIndex').orderBy('nameKana')
  const snapShot = await querySorted.get()
  return snapShot.docs.map(doc => doc.data()).filter(d => isSong(d)) as Song[]
}

export async function fetchSongById(songId: string) {
  const doc = await db.doc(`version/1/songs/${songId}`).get()
  const unknown = doc.data()
  return isSong(unknown)
    ? unknown
    : Promise.reject(
        new Error(`"version/1/songs/${songId}" is not Song object`)
      )
}
