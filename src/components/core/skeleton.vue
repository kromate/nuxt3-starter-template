<template>
	<div
		class="pulsate border border-gray-400"
		:style="{ width: width, height: height, 'border-radius': radius }"
	/>
</template>

<script lang="ts" setup>
defineProps({
	width: {
		default: '100%',
		type: String
	},
	height: {
		default: '100%',
		type: String
	},
	radius: {
		default: '0px',
		type: String
	}
})
</script>

<style scoped>
.pulsate {
  max-width: 100vw !important;
  background: linear-gradient(
    to right,
    #77767633 8%,
    #8282824d 18%,
    #82828233 33%
  );
  background-size: 800px 100px;
  animation: Gradient 2s ease-out infinite;
}
@keyframes Gradient {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
