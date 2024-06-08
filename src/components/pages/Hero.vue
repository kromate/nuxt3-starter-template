<template>
	<div class="bg-secondary">
		<div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
			<div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
				<div class="px-6 lg:px-0 lg:pt-4">
					<div class="mx-auto max-w-2xl">
						<div class="max-w-lg flex flex-col items-start">
							<div class="p-4 rounded-full border-2 border-primary shadow w-auto">
								<Rocket class="text-primary md:h-10 md:w-10" />
							</div>


							<h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Less Set-Up, <br> More Shipping
							</h1>
							<p class="mt-6 text-xl leading-8 text-gray-600">
								A modern, feature-rich starter template for Nuxt 3 projects, integrating
								<span class="text-[#FFA611] font-bold">Firebase</span>,
								<span class="text-[#f67373] font-bold">Lucide Icons</span>,
								<span class="text-[#10b981] font-bold">Radix Vue</span>, and
								<span class="text-indigo-600 font-bold">TailwindCSS</span>.
							</p>

							<div class="mt-10 flex items-center gap-x-6">
								<a href="https://github.com/kromate/nuxt3-starter-template" target="_blank" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get Started</a>
								<a href="https://github.com/kromate/nuxt3-starter-template" target="_blank" class="text-sm font-semibold leading-6 text-gray-900">View on GitHub <span aria-hidden="true">→</span></a>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
					<div class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-[#ffffffe8] shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
					<div class="shadow-lg md:rounded-3xl">
						<div class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
							<div class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
							<div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
								<div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
									<div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
										<div class="flex bg-gray-800/40 ring-1 ring-white/5">
											<div class="-mb-px flex text-sm font-medium leading-6 text-gray-400">
												<a href="https://kromate.dev/" target="_blank" class="border-b border-r underline border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
													Kromate.vue
												</a>
												<a href="https://taaskly.xyz/?ref=nuxt3-template" target="_blank" class="border-r border-gray-600/10 px-4 py-2">
													Taaskly.vue
												</a>
											</div>
										</div>
										<div class="px-6 pb-14 pt-6">
											<PagesPreCode />
										</div>
									</div>
									<div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl" aria-hidden="true" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import { Rocket } from 'lucide-vue-next'
</script>
