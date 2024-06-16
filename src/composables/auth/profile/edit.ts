import { serverTimestamp } from 'firebase/firestore'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { useAlert } from '@/composables/core/notification'
import { useAuthModal } from '@/composables/core/modals'
import { useUser } from '@/composables/auth/user'

const isDisabled = ref(true)


const userProfileForm = {
    bio: ref(''),
    updated_at: ref(serverTimestamp()),
    skills: ref([] as string[]),
    location: ref({
        geohash: '',
        location: {
            name: '',
            lng: 0,
            lat: 0
        }
    }),
    links: ref({
        whatsapp: '',
        facebook: '',
        instagram: '',
        twitter: ''
    })
}

const populateData = () => {
    const { userProfile } = useUser()
    userProfileForm.bio.value = userProfile.value?.bio ?? ''
    userProfileForm.updated_at.value = serverTimestamp()
    userProfileForm.skills.value = userProfile.value?.skills ?? []
    userProfileForm.location.value = {
        geohash: userProfile.value?.geohash ?? '',
        location: {
            name: userProfile?.value?.location?.name ?? '',
            lng: userProfile?.value?.location?.lng ?? 0,
            lat: userProfile?.value?.location?.lat ?? 0
        }
    }
    userProfileForm.links.value = {
        whatsapp: userProfile.value?.links?.whatsapp ?? '',
        facebook: userProfile.value?.links?.facebook ?? '',
        instagram: userProfile.value?.links?.instagram ?? '',
        twitter: userProfile.value?.links?.twitter ?? ''
    }
}

export const useUpdateUserProfile = () => {
    const { id: user_id, isLoggedIn, userProfile, fetchUserProfile } = useUser()
    const loading = ref(false)
    const update = async () => {
        if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
        const sentData = {
            bio: userProfileForm.bio.value,
            updated_at: serverTimestamp(),
            skills: userProfileForm.skills.value,
            ...userProfileForm.location.value,
            links: {
                whatsapp: userProfileForm.links.value.whatsapp,
                facebook: userProfileForm.links.value.facebook,
                instagram: userProfileForm.links.value.instagram,
                twitter: userProfileForm.links.value.twitter
            }
        } as any

        if (!user_id.value) {
            useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
            return
        }
        try {
            loading.value = true
            await updateFirestoreDocument('users', user_id.value, sentData)
            userProfile.value = sentData
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Profile updated successfully' })
            fetchUserProfile(user_id.value)
            isDisabled.value = true
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    const updatePhoto = async (url: string) => {
        if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
        if (!user_id.value) {
            useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
            return
        }
        try {
            loading.value = true
            await updateFirestoreDocument('users', user_id.value, {
                photo_url: url
            })
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Profile photo updated successfully' })
            fetchUserProfile(user_id.value)
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'updatePhoto' })
        }
    }

    return { userProfileForm, update, loading, populateData, isDisabled, updatePhoto }
}

export const validate_data = (data: Record<string, any>, ignoreKeys: string[] = []) => {
	for (const key in data) {
		if (data.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
			const value = data[key]
			if (!value) {
				useAlert().openAlert({ type: 'ERROR', msg: `Error: ${key} is required` })
				return false
			}
			if (typeof value === 'object') {
				validate_data(value, ignoreKeys)
			}
		}
	}
	return true
}

export const validate_data_array = (dataArray: Array<Record<string, any>>, withAlert = true) => {
    for (const data of dataArray) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key]
                if (!value) {
                    if (withAlert) {
                        useAlert().openAlert({ type: 'ERROR', msg: `Error: ${key} is required` })
                    }
                    return false
                }
                if (typeof value === 'object' && !Array.isArray(value)) {
                    // If it's an object but not an array, recursively validate it
                    validate_data_array([value], withAlert)
                }
            }
        }
    }
    return true
}
