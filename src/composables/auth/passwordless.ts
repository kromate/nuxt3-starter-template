import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, User } from 'firebase/auth'
import { useUser } from '@/composables/auth/user'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'

export const usePasswordlessSignin = () => {
	const actionCodeSettings = {
		url: process.client ? `https://${location.host}/auth/authenticate` : '',
		handleCodeInApp: true
	}
	const loading = ref(false)
	const credentienals = {
		email: ref('')
	}

	const _email = useCookie('emailForSignIn')

	const disabled = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(credentienals.email.value)
	})
	const send_email = async () => {
		loading.value = true
		try {
			await sendSignInLinkToEmail(authRef, credentienals.email.value, actionCodeSettings)

			_email.value = credentienals.email.value

			useRouter().push(`/auth/sentEmail/?email=${credentienals.email.value}`)
		} catch (e: any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
		}
		loading.value = false
    }

	const initAuth = () => {
		if (process.client) {
			if (isSignInWithEmailLink(authRef, window.location.href) && _email) useSignInWithEmailLink(_email.value as string)
		}
    }

    const useSignInWithEmailLink = async (email: string) => {
        loading.value = true
		try {
			const href = process.client ? window.location.href : ''
			const result = await signInWithEmailLink(authRef, email, href)
			_email.value = undefined


            const user = result.user as User as any
            await useUser().setUser(user as User)
			const token = await user?.auth.currentUser.getIdTokenResult()
			const hasProfile = token?.claims?.hasUpdatedProfile


			if (!hasProfile) await useRouter().push('/auth/profile')

			const redirectUrl = useUser().redirectUrl.value
			useUser().redirectUrl.value = null
			await useRouter().push(redirectUrl ?? '/dashboard')


			loading.value = false
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message })
        }
    }

	return { credentienals, loading, disabled, send_email, initAuth, _email, useSignInWithEmailLink }
}
