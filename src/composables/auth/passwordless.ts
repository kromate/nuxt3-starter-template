import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, User } from 'firebase/auth'
import { useAuthModal } from '../core/modals'
import { authCredentienalsForm } from './auth'
import { useUser } from '@/composables/auth/user'
import { authRef } from '~~/src/firebase/auth'
import { useAlert } from '~~/src/composables/core/notification'




export const usePasswordlessSignin = () => {
	const actionCodeSettings = {
		url: process.client ? `https://${location.host}/auth/authenticate` : '',
		handleCodeInApp: true
	}

	const _email = useCookie('emailForSignIn')

	const disabled = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(authCredentienalsForm.email.value) || authCredentienalsForm.passord.value.length < 3
	})

	const valid_email = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(authCredentienalsForm.email.value)
	})

	const send_email = async () => {
		authCredentienalsForm.loading.value = true
		try {
			await sendSignInLinkToEmail(authRef, authCredentienalsForm.email.value, actionCodeSettings)

			_email.value = authCredentienalsForm.email.value

			useRouter().push(`/auth/sentEmail/?email=${authCredentienalsForm.email.value}`)
		} catch (e: any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
		}
		authCredentienalsForm.loading.value = false
    }

	const initAuth = () => {
		if (process.client) {
			if (isSignInWithEmailLink(authRef, window.location.href) && _email) useSignInWithEmailLink(_email.value as string)
		}
    }

    const useSignInWithEmailLink = async (email: string) => {
        authCredentienalsForm.loading.value = true
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
			await useRouter().push(redirectUrl ?? '/main/business')
			useAuthModal().closeAll()

			authCredentienalsForm.loading.value = false
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message })
        }
    }

	return { disabled, send_email, initAuth, _email, useSignInWithEmailLink, valid_email }
}
