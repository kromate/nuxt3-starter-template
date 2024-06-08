<template>
	<div>
		<NuxtPage v-if="true" />
		<div v-else class="text-4xl my-20 font-bold text-center">
			Page not found
		</div>
	</div>
</template>




<script setup lang="ts">
import { useSubdomain, useSubdomainSite } from '@/composables/core/subdomain'
// import { useAPI } from '@/api_factory/index'


const subdomain = useSubdomain()
const business = useSubdomainSite()



	// const { data } = await useAPI('/getBusinessByLink', {
	// 		method: 'POST',
	// 		body: { link: subdomain.value }
	// }) as any

	// business.value = data.value


</script>

