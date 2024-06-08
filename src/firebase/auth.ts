import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut, setPersistence, browserLocalPersistence,
	User
} from 'firebase/auth'
import { auth } from './init'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

const { openAlert } = useAlert()


export const watchUserStateChange = () => {
	if (process.client) {
		onAuthStateChanged(auth, async (user) => {
			const { clearUser, setUser } = useUser()
			if (user) await setUser(user)
			else await clearUser()
		})
	}
}

// export const getCurrentUser = async () => {
// 	const user = auth.currentUser
// 	const { clearUser, setUser } = useUser()
// 			if (user) await setUser(user)
// 			else await clearUser()
// }


export const authRef = auth
const provider = new GoogleAuthProvider()

export const googleAuth = async () => {
	try {
			const result = await signInWithPopup(auth, provider)
		const token = await result.user.getIdToken()
		await serverAuth(token)
		return result.user as User
	} catch (err: any) {
		useAlert().openAlert({ type: 'ERROR', msg: `Error: ${err}` })
	}
}

export const signOutUser = async () => {
	const { clearUser, user } = useUser()
	try {
		await signOut(auth)
		await clearUser()
	} catch (error:any) {
		openAlert({ type: 'ERROR', msg: `Oops seems something went wrong 😕 : ${error.message}` })
	}
}

const serverAuth = async (token: string) => {
	try {
		await $fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ token })
	})
	} catch (err: any) {
		throw new Error(err.response._data.message)
    }
  }
