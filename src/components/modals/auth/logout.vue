<template>
	<Modal
		modal="$atts.modal"
		title="Sign Out"
		:is-full-height="false"
	>
		<p class="text-dark text-lg tracking-[0.1rem] text-center">
			Are you sure you want to sign out?
		</p>

		<div class="flex flex-col mt-5">
			<button class="modal-btn border-red bg-red text-white hover:bg-red" @click="signOut">
				Logout
			</button>
			<button class="modal-btn text-dark mt-3" @click="useAuthModal().closeLogout()">
				Cancel
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useSignin } from '@/composables/auth/auth'
import Modal from '@/components/core/modal/Modal.vue'

const { signOut, loading } = useSignin()

</script>

<style>

</style>
