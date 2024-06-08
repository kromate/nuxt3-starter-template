<template>
	<div class="auth-box">
		<h1 class="auth-title">
			Welcome back
		</h1>
		<p class="text-2xl text-dark text-center font-semibold  tracking-wide">
			{{ _email ? 'Currently signing you in, kindly hold on':'kindly enter your email below' }}
		</p>
		<form v-if="!_email" class="auth-form" @submit.prevent="useSignInWithEmailLink(credentienals.email.value)">
			<div class="field">
				<input id="email" v-model="credentienals.email.value" placeholder="Enter a valid Email address" type="email" class="input-field" required>
			</div>
			<button class="btn-primary_flat w-full mt-2" :disabled="passwordlessLoginLoading || disabled" type="submit" @click="send_email">
				<span v-if="!passwordlessLoginLoading"> Send link to email</span>
				<Spinner v-else />
			</button>
		</form>
		<div v-else class="flex flex-col items-center justify-center ">
			<Spinner class="!border-t-dark !bg-line" size="40px" />
		</div>

		<div class="flex justify-between items-center gap-2 my-2 w-full">
			<div class="border-line border-b h-1 flex-1" />
		</div>
		<nuxt-link to="/auth/login" class="btn_flat w-full bg-dark text-light">
			<span class="flex items-center gap-3"> 	Go back to login</span>
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
	import { usePasswordlessSignin } from '@/composables/auth/passwordless'

const { credentienals, loading: passwordlessLoginLoading, initAuth, _email, disabled, useSignInWithEmailLink, send_email } = usePasswordlessSignin()


	initAuth()


	definePageMeta({
		layout: 'auth',
		middleware: 'is-not-authenticated'
	})
</script>

