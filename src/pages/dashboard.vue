<template>
	<div>
		bhvghv
		<button @click="signOut">
			log out
		</button>
	</div>
</template>

<script setup lang="ts">
import { useSignin } from '@/composables/auth/auth'
import { useUser } from '@/composables/auth/user'

const { clearUser } = useUser()

const { signOut } = useSignin()

definePageMeta({
	layout: 'default',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
