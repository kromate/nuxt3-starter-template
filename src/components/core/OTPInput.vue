<template>
	<div class="field relative">
		<label for="otp mb-3">Enter your OTP</label>

		<PinInputRoot v-model="modelValue" type="number" :otp="true" :length="length" class="flex gap-2 items-center mt-1" placeholder="○" @completed="$emit('completed')">
			<PinInputInput v-for="(id, index) in length" :key="id" :index="index" class="box" />
		</PinInputRoot>
	</div>
</template>

<script setup>
import { PinInputInput, PinInputRoot } from 'radix-vue'


const modelValue = defineModel({ type: Array, default: () => [] })

const props = defineProps({
  length: {
    type: Number,
    default: 6
  }

})

const emit = defineEmits(['completed'])






</script>

<style scoped>
.box{
    @apply text-center border border-dark rounded-md w-full h-10 md:h-14 md:text-3xl;
}
</style>


<!-- love is pain - at the end of the day, we all want to be loved, but we are all afraid of the pain that comes with it. but we all know that the pain is worth it.
and that is why we keep on loving, and maybe when it hurt we would have gain something to surpass the pain. something silver and gold won't be able to buy -->
