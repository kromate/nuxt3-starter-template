<template>
	<div class="auth-box">
		<!-- <img src="@/assets/images/main/c_shop.svg" alt="logo" width="90" height="90"> -->
		<h1 class="auth-title">
			Hi there
		</h1>
		<p class="text-2xl text-dark text-center font-semibold  tracking-wide">
			Forgot Password
		</p>
		<form v-if="step===1" class="auth-form" @submit.prevent="sendRestEmail()">
			<div class="field">
				<label for="email">Email Address</label>
				<input
					id="email"
					v-model="authCredentienalsForm.email.value"
					placeholder="Enter a valid Email address"
					type="email"
					class="input-field"
					autocomplete="off"
					required
				>
			</div>


			<button class="btn-primary_flat w-full mt-2" :disabled="authCredentienalsForm.loading.value || valid_email" type="submit">
				<span v-if="!authCredentienalsForm.loading.value">Continue</span>
				<Spinner v-else />
			</button>
		</form>
		<div v-else class="auth-form py-4">
			<p class="text-grey5 ">
				We sent a link to <b>{{ authCredentienalsForm.email.value }}</b> <br>
				To reset your password, please go to your email and click the link.
			</p>
			<nuxt-link to="/auth/login" class="btn-primary_flat w-full mt-2" :disabled="authCredentienalsForm.loading.value || valid_email" type="submit">
				<span v-if="!authCredentienalsForm.loading.value">Continue</span>
				<Spinner v-else />
			</nuxt-link>
		</div>


		<p v-if="step===1" class="text-sm mt-4 text-dark text-center">
			Already have an account? <nuxt-link to="/auth/login" class="font-bold underline text-dark">
				login
			</nuxt-link>
		</p>
	</div>
</template>

<script setup lang="ts">
import { useForgotPassword } from '@/composables/auth/forgot'
import { authCredentienalsForm } from '@/composables/auth/auth'
import { usePasswordlessSignin } from '@/composables/auth/passwordless'

const { sendRestEmail, step } = useForgotPassword()
const { valid_email } = usePasswordlessSignin()


const referred = ref('')
onMounted(() => {
	referred.value = useRoute().query.refer as string
	localStorage.setItem('taaskly_referral', referred.value)
})

definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})

</script>

<style scoped>

</style>
