<template>
	<div>
		<NuxtLoadingIndicator :height="4" color="#4F1DED" />
		<NuxtLayout> <NuxtPage /> </NuxtLayout>
	</div>
	<footer v-if="!online" class="center bg-red text-white py-1 fixed bottom-0 inset-x-0">
		You are currently offline
	</footer>
</template>

<script lang='ts' setup>
import { useOnline } from '@vueuse/core/index'

const online = useOnline()





</script>

