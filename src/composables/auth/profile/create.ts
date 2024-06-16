import { watchDebounced } from '@vueuse/core'
import { signInWithCustomToken } from 'firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { authRef } from '@/firebase/auth'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useUser } from '@/composables/auth/user'
import { callFirebaseFunction } from '@/firebase/functions'


const profileFormState = {
	username: ref(''),
	first_name: ref(''),
	last_name: ref(''),
	photo_url: ref(''),
	email: ref(''),
	phone: ref(''),
	verified_level: ref(0),
	wallet_balance: ref(0),
	profile_level: ref(0),
	tasker_rating: ref(0),
	runner_rating: ref(0),
	created_at: ref(new Date().toISOString()),
	updated_at: ref(new Date().toISOString()),
	referrer: ref(''),
	reason: ref([])
}



export const useCreateProfile = () => {
	const { id, userProfile } = useUser()
	const loading = ref(false)
	const phoneNumError = ref()
	watch(profileFormState.phone, (val) => {
		if (val.toString().length < 10) {
			phoneNumError.value = 'Invalid Phone Number'
		} else {
			phoneNumError.value = null
		}
	})
	const createProfile = async () => {
		loading.value = true

		const profileUploadData = {
			id: id.value,
			username: profileFormState.username.value,
			first_name: profileFormState.first_name.value,
			last_name: profileFormState.last_name.value,
			email: profileFormState.email.value,
			phone: profileFormState.phone.value,
			verified_level: profileFormState.verified_level.value,
			profile_level: profileFormState.profile_level.value,
			tasker_rating: profileFormState.tasker_rating.value,
			runner_rating: profileFormState.runner_rating.value,
			created_at: profileFormState.created_at.value,
			updated_at: profileFormState.updated_at.value,
			referrer: profileFormState.referrer.value,
			reason: profileFormState.reason.value
		}

		try {
			const res = await callFirebaseFunction('createUser', profileUploadData) as any
			if (res.code === 200) {
				if (res.update) {
					await signInWithCustomToken(authRef, res.token)
					useUser().setUser(res.user)
				} else {
					await signInWithCustomToken(authRef, res.token)
					useUser().setUser(res.user)
				}
				const redirectUrl = useUser().redirectUrl.value
				useUser().redirectUrl.value = null
				location.assign(redirectUrl ?? '/main/business')
				useAlert().openAlert({ type: 'SUCCESS', msg: res.msg })

				loading.value = false
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: res.msg })
				loading.value = false
			}
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	const initForm = () => {
		profileFormState.phone.value = useUser().user.value?.phoneNumber as string
		profileFormState.email.value = useUser().user.value?.email as string
		profileFormState.photo_url.value = useUser().user.value?.photoURL as string
		profileFormState.first_name.value = useUser().user.value?.displayName?.split(
			' '
		)[0] as string
		profileFormState.last_name.value = useUser().user.value?.displayName?.split(
			' '
		)[1] as string
		if (process.client && localStorage.getItem('taaskly_referral') && localStorage.getItem('taaskly_referral') !== 'null' && localStorage.getItem('taaskly_referral') !== 'undefined') {
			profileFormState.referrer.value = localStorage.getItem('taaskly_referral') as string
		}

		watch(profileFormState.referrer, () => {
			profileFormState.referrer.value =
				profileFormState.referrer.value.replace(/ /g, '').toLowerCase()
		})
	}
	return {
		createProfile,
		profileFormState,
		loading,
		initForm,
		phoneNumError
	}
}



export const useUsername = () => {
	const isUsernameAvailable = ref(true)
	const loading = ref(false)

	const checkUsername = async () => {
		loading.value = true
		profileFormState.username.value = profileFormState.username.value.replace(/ /g, '').toLowerCase()
		const usernames = ref([])

		await getFirestoreCollectionWithWhereQuery('usernames', usernames, { name: 'username', operator: '==', value: profileFormState.username.value })



		if (usernames.value.length) {
			isUsernameAvailable.value = false
		} else {
			isUsernameAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(profileFormState.username, checkUsername, { debounce: 500 })

	return { isUsernameAvailable, checkUsername, loading }
}


