import { User } from '@firebase/auth'
import { ProfileType } from './types/profile'
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'




export const useUser = () => {
    const _userCookie = useCookie('user')
    const _userProfileCookie = useCookie('userProfile')
    const redirectUrl = useCookie('redirectUrl')

    const user = computed(() => {
    if (_userCookie.value) {
        if (typeof _userCookie.value === 'string') {
            return JSON.parse(_userCookie.value)
        } else if (typeof _userCookie.value === 'object') {
            return _userCookie.value
        }
    }
    return null
    }) as Ref<User | null>

    const setUser = async (user: User) => {
        if (!user?.uid) {
            clearUser()
            return
        }
        await fetchUserProfile(user.uid)
        _userCookie.value = JSON.stringify(user)
    }
    const userProfile = computed(() => {
        if (_userProfileCookie.value) return _userProfileCookie.value
        else
            if (user.value) {
                fetchUserProfile(user.value.uid).then(() => {
                    return _userProfileCookie.value
                })
        }

        return null
    }) as Ref<ProfileType | null>

    const isLoggedIn = computed(() => { return !!user.value })
    const username = computed(() => { return userProfile.value ? userProfile.value.username : null })
    const id = computed(() => { return user.value ? user.value.uid : null })
    const is_admin = computed(() => { return userProfile.value ? userProfile.value.is_admin : false })

    const clearUser = () => {
        _userCookie.value = null
        _userProfileCookie.value = null
        if (process.client) {
            localStorage.clear()
        }
    }


    const fetchUserProfile = async (uid:string) => {
        if (user.value && uid) {
            await getSingleFirestoreDocument('users', uid, _userProfileCookie)
        }
    }
    return { setUser, clearUser, user, userProfile, redirectUrl, isLoggedIn, username, id, is_admin, fetchUserProfile }
}
