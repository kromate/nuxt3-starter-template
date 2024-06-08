import { doc, onSnapshot, getDoc, limit, collection, query } from 'firebase/firestore'
import { db } from '../init'




const FETCHLIMIT = 300

export const getSingleFirestoreDocument = async(
	collection: string,
	id: string,
	DocumentRef: Ref<any>
) => {
	// if (process.server) {
	// 	const { data, error } = await useFetch(`/api/getSingleFirestoreDocument?collection=${collection}&id=${id}`)
	// 	if (data) {
	// 		DocumentRef = data
	// 	return DocumentRef.value
	// 	} else {
	// 		DocumentRef.value = {}
	// 		return DocumentRef.value
	// 	}
	// }

	// if (process.client) {
			return new Promise((resolve, reject) => {
		const singleDocumentRef = doc(db, collection, id)
		const unsub = onSnapshot(singleDocumentRef, (docSnap) => {
			if (docSnap.exists()) {
				DocumentRef.value = docSnap.data()
				resolve(DocumentRef.value)
			} else {
				DocumentRef.value = {}
				resolve(DocumentRef.value)
				// reject(new Error('Document does not exist'))
			}
		})
	})
	// }
}

export const getSingleFirestoreSubDocument = async(
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	id: string,
	DocumentRef: Ref<any>
) => {
	return new Promise((resolve, reject) => {
		const singleDocumentRef = doc(db, collectionName, documentName, subCollectionName, id)
		const unsub = onSnapshot(singleDocumentRef, (docSnap) => {
			if (docSnap.exists()) {
				DocumentRef.value = docSnap.data()
				resolve(DocumentRef.value)
			} else {
				DocumentRef.value = {}
				resolve(DocumentRef.value)
				// reject(new Error('Subdocument does not exist'))
			}
		})
	})
}

export const getFirestoreCollection = async (
	collectionName: string,
	ArrayRef: Ref<Array<any>>,
	findFn = (item, change) => item.id === change.id
) => {
	const collectionRef = collection(db, collectionName)
	// const q = query(collectionRef)
	const q = query(collectionRef, limit(FETCHLIMIT))

	return new Promise((resolve) => {
		onDataRefChange(resolve, q, ArrayRef, findFn)
	})
}

export const getFirestoreSubCollection = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	ArrayRef: Ref<Array<any>>,
	findFn = (item, change) => item.id === change.id
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName)
	// const q = query(collectionRef)
	const q = query(collectionRef, limit(FETCHLIMIT))

	return new Promise((resolve) => {
		onDataRefChange(resolve, q, ArrayRef, findFn)
	})
}

export const getFirestoreSubSubCollection = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	subDocumentName: string,
	subSubCollectionName: string,
	ArrayRef: Ref<Array<any>>,
	findFn = (item, change) => item.id === change.id
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName, subDocumentName, subSubCollectionName)
	// const q = query(collectionRef)
	const q = query(collectionRef, limit(FETCHLIMIT))

	return new Promise((resolve) => {
		onDataRefChange(resolve, q, ArrayRef, findFn)
	})
}

const onDataRefChange = (resolve, q, ArrayRef, findFn) => {
	const unsub = onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
				const existingItem = ArrayRef.value.find((item) => findFn(item, change.doc.data()))
                if (!existingItem) {
					ArrayRef.value.push(change.doc.data())
				}
            } else if (change.type === 'modified') {
                const index = ArrayRef.value.findIndex((item) => findFn(item, change.doc.data()))
                if (index !== -1) {
                    ArrayRef.value[index] = change.doc.data()
                }
            } else if (change.type === 'removed') {
                ArrayRef.value = ArrayRef.value.filter((item) => !findFn(item, change.doc.data()))
            }
		})

        resolve(ArrayRef.value)
	})
}





