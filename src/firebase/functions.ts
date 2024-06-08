import { httpsCallable } from 'firebase/functions'
import { functions } from './init'

export const callFirebaseFunction = async (
	functionName: string,
	details: Record<string, any>
) => {
	const call = httpsCallable(functions, functionName)
	return new Promise((resolve, reject) => {
		try {
			const result = call(details).then((res) => {
				resolve(res.data)
			})
		} catch (e) {
			reject(e)
		}
	})
}
