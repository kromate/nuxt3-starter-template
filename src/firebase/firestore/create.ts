import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../init'

export const setFirestoreDocument = async (
	collection: string,
	id: string = uuidv4(),
	data: any
) => {
	await setDoc(doc(db, collection, id), data)
}
export const setFirestoreSubDocument = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	id: string = uuidv4(),
	data: any
) => {
	await setDoc(doc(db, collectionName, documentName, subCollectionName, id), data)
}
