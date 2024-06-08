
<template>
	<div class="relative overflow-hidden  w-full  shadow-xl  p-4 py-5 rounded-md box border-[1.5px]  bg-light" :style="`border-color:${COLOR}`">
		<div :style="`width:${BORDER_WIDTH}%`" :class="[`h-1  absolute  bottom-0 left-0 transite transition-all !duration-[80ms]`]" />
		<span @click="$emit('closeAlert', id)">
			<CircleX
				name="close"
				class="text-dark w-5 absolute  right-2 top-2 cursor-pointer rounded-md"
				:color="COLOR"
			/>

		</span>

		<div class="flex items-center pr-12 gap-3">
			<Component :is="ICON" :color="COLOR" />

			<div>
				<p class="text-semibold text-dark">
					{{ message }}
				</p>
				<p v-if="is_dev" class="text-semibold text-dark text-xs italic underline">
					{{ addrs }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { TriangleAlert, CircleX, CircleCheck, Info } from 'lucide-vue-next'
import { is_dev } from '@/composables/utils/system'



const emit = defineEmits(['closeAlert'])

const props = defineProps({
    id: {
        type: String,
        required: true,
        default: ''
    },
    message: {
        type: String,
        required: true,
        default: ''
    },
    addrs: {
        type: String,
        required: false,
        default: ''
    },
    type: {
        type: String,
        required: true,
        default: 'Alert'
    },
    duration: {
        type: Number,
        required: false,
        default: 5000
    }
})


const BORDER_WIDTH = ref(100)


onMounted(() => {
		BORDER_WIDTH.value = 100
		const intervalSequence = setInterval(() => {
		const substractedValue	= Number((100 / (props.duration / 100)).toFixed(1))
            BORDER_WIDTH.value -= substractedValue
		}, 100)

    setTimeout(() => {
        clearInterval(intervalSequence)
        emit('closeAlert', props.id)
    }, props.duration)
})


const ICON = computed({
	get: () => {
		switch (props.type) {
			case 'ERROR':
				return TriangleAlert
			case 'SUCCESS':
				return CircleCheck
			default:
				return Info
		}
	},
	set: () => {}
})

const COLOR = computed({
		get: () => {
			switch (props.type) {
				case 'ERROR':
					return 'red'
				case 'SUCCESS':
					return 'green'
				default:
					return 'black'
			}
		},
		set: () => {}
})


</script>

<style scoped>
.generator_tw{
	@apply text-green-500 border-green-500 bg-green-500
}

/* enter transitions */
.toast-enter-active {
	animation: wobble 0.5s ease;
}

.toast-enter-from {
	opacity: 0;
	transform: translateX(100px);
}
.toast-leave-to {
	opacity: 0;
	transform: translateX(100px);
}
.toast-leave-active {
	transition: all 0.3s ease;
}
@keyframes wobble {
	0% {
		transform: translateX(100px);
		opacity: 0;
	}
	50% {
		transform: translateY(0px);
		opacity: 1;
	}
	60% {
		transform: translateX(14px);
		opacity: 1;
	}
	70% {
		transform: translateX(-14px);
		opacity: 1;
	}
	80% {
		transform: translateX(7px);
		opacity: 1;
	}
	90% {
		transform: translateX(-7px);
		opacity: 1;
	}
	100% {
		transform: translateX(0px);
		opacity: 1;
	}
}
.box {
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
