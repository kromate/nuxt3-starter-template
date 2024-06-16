import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { useUser } from '@/composables/auth/user'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { firebaseErrorMessage } from '@/firebase/utils'




export const useEmailAndPassword = () => {
    const router = useRouter()

 const signIn = async () => {
    authCredentienalsForm.loading.value = true
    try {
        const userCredential = await signInWithEmailAndPassword(authRef, authCredentienalsForm.email.value, authCredentienalsForm.passord.value)
        await useUser().setUser(userCredential.user)
        const token = await userCredential.user.getIdTokenResult()
        const hasProfile = token?.claims?.hasUpdatedProfile

        if (!hasProfile) await router.push('/auth/profile')
        const redirectUrl = useUser().redirectUrl.value
        useUser().redirectUrl.value = null
        await router.push(redirectUrl ?? '/main/business')

        authCredentienalsForm.loading.value = false
    } catch (err: any) {
      authCredentienalsForm.loading.value = false
        useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
    }
 }

 const signUp = async () => {
    authCredentienalsForm.loading.value = true
    try {
        const userCredential = await createUserWithEmailAndPassword(authRef, authCredentienalsForm.email.value, authCredentienalsForm.passord.value)

        await useUser().setUser(userCredential.user)
        const token = await userCredential.user.getIdTokenResult()
        const hasProfile = token?.claims?.hasUpdatedProfile

        if (!hasProfile) await router.push('/auth/profile')
        const redirectUrl = useUser().redirectUrl.value
        useUser().redirectUrl.value = null
        await router.push(redirectUrl ?? '/main/business')

        authCredentienalsForm.loading.value = false
    } catch (err: any) {
      authCredentienalsForm.loading.value = false

        useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
    }
 }


    return { signIn, signUp }
}
