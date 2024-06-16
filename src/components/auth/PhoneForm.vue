<template>
	<form v-if="step===1" class="auth-form" @submit.prevent="signInWIthPhone">
		<PhoneInput v-model="authCredentienalsForm.phone.value" />
		<div id="recaptcha-container" />
		<button class="btn-primary_flat w-full mt-2" :disabled="authCredentienalsForm.loading.value || authCredentienalsForm.phone.value.length < 11" type="submit">
			<span v-if="!authCredentienalsForm.loading.value">Send OTP</span>
			<Spinner v-else />
		</button>
	</form>
	<form v-if="step===2" class="auth-form" @submit.prevent="confirmOTP">
		<OTPInput v-model="otp" />
		<div id="recaptcha-container" />
		<button class="btn-primary_flat w-full mt-2" :disabled="otp.length < 6" type="submit">
			<span v-if="!authCredentienalsForm.loading.value">Procced</span>
			<Spinner v-else />
		</button>
	</form>
</template>

<script setup lang="ts">
import { authCredentienalsForm } from '@/composables/auth/auth'
import { usePhoneAuth } from '@/composables/auth/phone'

const { init_reCAPTCHA, signInWIthPhone, step, otp, confirmOTP } = usePhoneAuth()


onMounted(() => {
	init_reCAPTCHA()
})

</script>

<style scoped>

</style>
