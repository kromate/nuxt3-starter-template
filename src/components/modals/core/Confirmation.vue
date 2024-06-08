
<template>
	<Modal
		modal="$atts.modal"
		:title="title"
		:is-full-height="false"

	>
		<p class="text-dark text-lg tracking-[0.1rem] text-center">
			{{ description }}
		</p>

		<div class="grid grid-cols-2 gap-4 mt-6">
			<button class="modal-btn" @click="closeAlert">
				No
			</button>
			<button class="modal-btn border-red bg-red text-light hover:bg-red" :disabled="loading" @click="call_function()">
				<span v-if="!loading"> Yes</span>
				<Spinner v-else />
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'

const { call_function, closeAlert, description, title, loading } = useConfirmationModal()

</script>

<style>

</style>
