import firebase from '@/plugins/firebase'
import 'firebase/firestore'
import { Song } from '@/types/song'

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
  return snapShot.docs.map(d => d.data() as Song)
}

export async function fetchSongById(songId: string) {
  const d = await db.doc(`version/1/songs/${songId}`).get()
  return d.data() as Song
}
