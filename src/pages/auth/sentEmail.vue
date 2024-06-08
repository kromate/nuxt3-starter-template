<template>
	<div class="auth-box btn_shadow border border-dark">
		<CircleCheck :size="56" />
		<h1 class="flex flex-col items-center text-dark text-xl font-bold">
			<span>A Link has been sent to </span>
			<span class="text-secondary">{{ email }}</span>
		</h1>
		<p class="text-sm font-semibold text-dark mt-4 italic">
			Open the link to sign in
		</p>
	</div>
</template>

<script setup lang="ts">
import { CircleCheck } from 'lucide-vue-next'
const email = useRoute().query.email

definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})

</script>


