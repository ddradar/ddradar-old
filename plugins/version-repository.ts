import firebase from '@/plugins/firebase'
import 'firebase/firestore'
import { hasNumberProperty } from '~/test/util'

const db = firebase.firestore()

export async function fetchVersion() {
  const c = await db.doc(`version/1`).get()
  const data = c.data()
  return isVersionDoc(data) ? data : { chartVersion: 0, songVersion: 0 }
}

function isVersionDoc(
  obj: unknown
): obj is { chartVersion: number; songVersion: number } {
  return (
    hasNumberProperty(obj, 'chartVersion') &&
    hasNumberProperty(obj, 'songVersion')
  )
}
