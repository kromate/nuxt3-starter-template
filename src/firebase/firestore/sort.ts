import { onSnapshot, limit, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../init'

const FETCHLIMIT = 250

export const getFirestoreCollectionWithSort = async (
	collectionName: string,
	ArrayRef: Ref<Array<any>>,
	Sort: { name: string, order: any }
) => {
	const collectionRef = collection(db, collectionName)
	const q = query(collectionRef, limit(FETCHLIMIT), orderBy(Sort.name, Sort.order))

	return new Promise((resolve) => {
		const unsub = onSnapshot(q, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					ArrayRef.value.push(change.doc.data())
				}
				if (change.type === 'modified') {
					const changedArray = ArrayRef.value.filter(
						(item) => item.id !== change.doc.data().id
					)
					ArrayRef.value = [...changedArray, change.doc.data()]
				}
				if (change.type === 'removed') {
					const changedArray = ArrayRef.value.filter(
						(item) => item.id !== change.doc.data().id
					)
					ArrayRef.value = changedArray
				}
			})
			resolve(ArrayRef.value)
		})
	})
}
export const getFirestoreSubCollectionWithSort = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	ArrayRef: Ref<Array<any>>,
	Sort: { name: string, order: any }
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName)
	const q = query(collectionRef, limit(FETCHLIMIT), orderBy(Sort.name, Sort.order))

	return new Promise((resolve) => {
		const unsub = onSnapshot(q, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					ArrayRef.value.push(change.doc.data())
				}
				if (change.type === 'modified') {
					const changedArray = ArrayRef.value.filter(
						(item) => item.id !== change.doc.data().id
					)
					ArrayRef.value = [...changedArray, change.doc.data()]
				}
				if (change.type === 'removed') {
					const changedArray = ArrayRef.value.filter(
						(item) => item.id !== change.doc.data().id
					)
					ArrayRef.value = changedArray
				}
			})
			resolve(ArrayRef.value)
		})
	})
}
