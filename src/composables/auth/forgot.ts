import { sendPasswordResetEmail } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { firebaseErrorMessage } from '@/firebase/utils'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'


export const useForgotPassword = () => {
    const step = ref(1)


    const sendRestEmail = async () => {
        authCredentienalsForm.loading.value = true
        try {
            await sendPasswordResetEmail(authRef, authCredentienalsForm.email.value)
            step.value = 2
            authCredentienalsForm.loading.value = false
        } catch (err: any) {
            authCredentienalsForm.loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
        }
    }


    return { step, sendRestEmail }
}
