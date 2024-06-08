import { v4 as uuidv4 } from 'uuid'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../init'

export const updateFirestoreDocument = async (
	collection: string,
	id: string = uuidv4(),
	data: any
) => {
	await updateDoc(doc(db, collection, id), data)
}
export const updateFirestoreSubDocument = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	id: string = uuidv4(),
	data: any
) => {
	await updateDoc(doc(db, collectionName, documentName, subCollectionName, id), data)
}
