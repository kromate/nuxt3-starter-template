import { useStorage } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'
import { callFirebaseFunction } from '~~/src/firebase/functions'







export const useFetchUserProfileByUserId = () => {
        const userProfileDetail = ref({} as any)
    const loading = ref(false)

    const fetchUserProfileByUserId = async (user_id: string) => {
        loading.value = true
        try {
            const res = await callFirebaseFunction('getUserProfile', { type: 'USERNAME', value: user_id }) as any
            if (res.code === 200) {
                userProfileDetail.value = res.msg
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: `Error: ${res.msg}`, addrs: 'fetchUserProfileByUserId' })
                loading.value = false
            }
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'fetchUserProfileByUserId' })
        }
    }

    return { fetchUserProfileByUserId, loading, userProfileDetail }
}
