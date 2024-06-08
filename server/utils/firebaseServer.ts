import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { configs } from './_keys'







export default function firebaseServer() {
    if (getApps().length === 0) {
        return initializeApp({
            // @ts-ignore
            credential: cert(configs),
            databaseURL: 'https://taaskly-dev-default-rtdb.firebaseio.com'
        })
    }
    return getApp()
}

export const serverside_db = getFirestore(firebaseServer())
