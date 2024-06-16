import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { authCredentienalsForm } from './auth'
import { authRef } from '@/firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { firebaseErrorMessage } from '@/firebase/utils'
import { useUser } from '@/composables/auth/user'

export const usePhoneAuth = () => {
    const router = useRouter()
    const step = ref(1)
    const otp = ref([])
    const confirmationResultRef = ref()
    const init_reCAPTCHA = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible'
            // callback: (response) => {
            //     signInWIthPhone()
            // }
        }, authRef)
    }

    const signInWIthPhone = async () => {
        authCredentienalsForm.loading.value = true
        try {
            const confirmationResult = await signInWithPhoneNumber(authRef, authCredentienalsForm.phone.value, window.recaptchaVerifier)
            step.value = 2
            authCredentienalsForm.loading.value = false
            confirmationResultRef.value = confirmationResult
        } catch (err: any) {
            authCredentienalsForm.loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
        }
    }

    const confirmOTP = async () => {
        authCredentienalsForm.loading.value = true
        try {
            const otpCode = otp.value.join('')
            console.log(otpCode)
            const userCredential = await confirmationResultRef.value?.confirm(otpCode)
            console.log(userCredential)
            await useUser().setUser(userCredential.user)
            const token = await userCredential.user.getIdTokenResult()
            const hasProfile = token?.claims?.hasUpdatedProfile
console.log(hasProfile)
            if (!hasProfile) await router.push('/auth/profile')
            const redirectUrl = useUser().redirectUrl.value
            useUser().redirectUrl.value = null
            console.log(redirectUrl)
            console.log('/main/business')
            await router.push(redirectUrl ?? '/main/business')

            authCredentienalsForm.loading.value = false
        } catch (err: any) {
            authCredentienalsForm.loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: firebaseErrorMessage(err) })
        }
    }

    return { init_reCAPTCHA, signInWIthPhone, step, otp, confirmOTP }
}


