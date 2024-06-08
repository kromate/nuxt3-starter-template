<template>
	<div id="loading" :style="{ width: size, height: size}" />
</template>

<script lang="ts" setup>
defineProps({
	size: {
		type: String,
		default: '28px',
		required: false

	}
})
</script>

<style>
#loading {
	display: block;

	border: 3px solid rgba(255, 255, 255, 0.634);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
