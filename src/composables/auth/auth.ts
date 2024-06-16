import { User } from 'firebase/auth'
import { useAuthModal } from '../core/modals'
import { useUser } from '@/composables/auth/user'
import { googleAuth, signOutUser } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'

export const authCredentienalsForm = {
		email: ref(''),
    passord: ref(''),
    phone: ref(''),
    loading: ref(false)
	}




export const useSignin = () => {
  const loading = ref(false)
  const router = useRouter()
  const route = useRoute()

  const googleSignin = async (saveRoute = false) => {
    if (saveRoute) useUser().redirectUrl.value = route.fullPath
    loading.value = true
    try {
      const user = await googleAuth() as User
      await useUser().setUser(user)
      const token = await user.getIdTokenResult()
      const hasProfile = token?.claims?.hasUpdatedProfile

      if (!hasProfile) await router.push('/auth/profile')
      const redirectUrl = useUser().redirectUrl.value
      useUser().redirectUrl.value = null
      await router.push(redirectUrl ?? '/main/business')

      loading.value = false
    } catch (err) {
      console.error('Google Sign-In Error:', err)
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    try {
      await signOutUser()
      if (location.pathname === '/auth/profile') await router.push('/auth/login')
      useAuthModal().closeLogout()
      useAlert().openAlert({ type: 'SUCCESS', msg: 'Signed out successfully' })
    } catch (err) {
      console.error('Sign Out Error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    googleSignin,
    signOut,
    loading
  }
}
