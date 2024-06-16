<template>
	<div class="flex gap-2 mb-4 w-full">
		<span
			class="auth_tab transite"
			:class="{ 'auth_tab_active': modelValue === 'email' }"
			@click="setAuthType('email')"
		>
			Email address
		</span>
		<span
			class="auth_tab transite"
			:class="{ 'auth_tab_active': modelValue === 'phone' }"
			@click="setAuthType('phone')"
		>
			Phone number
		</span>
	</div>
</template>

<script setup>


const modelValue = defineModel({ type: String, default: 'email' })

const setAuthType = (type) => {
  modelValue.value = type
}
</script>

<style scoped>
.auth_tab {
        @apply text-line py-2 px-3.5 rounded-md text-sm font-medium cursor-pointer;
    }
    .auth_tab_active {
        @apply bg-hover text-dark;
    }
</style>
