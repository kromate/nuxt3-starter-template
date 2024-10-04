<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Upwork SEO Expert Job Scraper</h1>
    <button
      @click="scrapeJobs"
      class="bg-grey-500 hover:bg-grey-700  font-bold py-2 px-4 rounded"
      :disabled="loading"
    >
      {{ loading ? 'Scraping...' : 'Scrape Jobs' }}
    </button>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    <div v-if="jobs.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Scraped Jobs:</h2>
      <div v-for="job in jobs" :key="job.link" class="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 class="text-lg font-semibold">
          <a :href="job.link" target="_blank" class="text-blue-600 hover:underline">{{ job.title }}</a>
        </h3>
        <p class="text-gray-600 mt-2">{{ job.description }}</p>
        <div class="flex justify-between mt-2 text-sm text-gray-500">
          <span>Budget: {{ job.budget }}</span>
          <span>Posted: {{ job.postedTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Job {
  title: string
  link: string
  description: string
  budget: string
  postedTime: string
}

const jobs = ref<Job[]>([])
const loading = ref(false)
const error = ref('')

const scrapeJobs = async () => {
  loading.value = true
  error.value = ''
  jobs.value = []

  try {
    const response = await fetch('/api/scrape/upwork_search')
    const result = await response.json()

    if (result.success) {
      jobs.value = result.data
    } else {
      error.value = result.error || 'An error occurred while scraping'
    }
  } catch (e) {
    error.value = 'An error occurred while fetching data'
  } finally {
    loading.value = false
  }
}
</script>
