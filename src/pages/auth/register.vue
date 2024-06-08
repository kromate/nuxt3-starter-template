<template>
	<div class="auth-box">
		<h1 class="auth-title">
			Hello stranger
		</h1>
		<p class="text-2xl text-dark text-center font-semibold  tracking-wide">
			Create Your account
		</p>
		<form class="auth-form" @submit.prevent="send_email()">
			<div class="field">
				<input
					id="email"
					v-model="credentienals.email.value"
					placeholder="Enter a valid Email address"
					type="email"
					class="input-field"
					required
				>
			</div>
			<button class="btn-primary_flat w-full mt-2" :disabled="passwordlessLoginLoading || disabled" type="submit">
				<span v-if="!passwordlessLoginLoading"> 	Send link to email</span>
				<Spinner v-else />
			</button>
		</form>
		<div class="flex justify-between items-center gap-2 my-2 w-full">
			<div class="border-line border-b h-1 flex-1" />
			<span class="text-dark leading-none font-bold">OR</span>
			<div class="border-line border-b h-1 flex-1" />
		</div>
		<button class="btn_flat w-full bg-dark text-light" :disabled="loading" @click="googleSignin()">
			<span v-if="!loading" class="flex items-center gap-3"> 	Sign up with Google</span>
			<Spinner v-else />
		</button>

		<p class="text-sm mt-4 text-dark text-center">
			Already have an account? <nuxt-link to="/auth/login" class="font-bold underline text-dark">
				login
			</nuxt-link>
		</p>
	</div>
</template>

<script setup lang="ts">
import { useSignin } from '@/composables/auth/auth'
import { usePasswordlessSignin } from '@/composables/auth/passwordless'
const { googleSignin, loading } = useSignin()

const { credentienals, loading: passwordlessLoginLoading, disabled, send_email } = usePasswordlessSignin()

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

