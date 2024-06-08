<template>
	<component :is="modals[id]" v-for="id in stack" :key="id" :props-modal="id" @close="$emit('close')" />
</template>

<script setup lang="ts">

import { modal } from '@/composables/core/modals'

const { stack, modals } = modal

</script>
