import { defineEventHandler, getQuery } from 'h3'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
    console.log('scraping');
  const query = getQuery(event)
  const searchTerm = query.q ? encodeURIComponent(query.q as string) : 'seo%20expert'

  try {
    const response = await axios.get(`https://www.upwork.com/nx/search/jobs/?q=${searchTerm}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    
    const jobs = $("article.job-tile").map((_, element) => {
      return {
        title: $(element).find(".up-n-link").text().trim(),
        description: $(element).find('[data-test="UpCLineClamp JobDescription"]').text().trim(),
        link: $(element).find('[data-test="job-tile-title-link"]').attr('href'),
        duration: $(element).find('[data-test="duration-label"]').text().trim(),
        experience: $(element).find('[data-test="experience-level"]').text().trim(),
        hourlyRate: $(element).find('[data-test="job-type-label"]').text().trim(),
        tags: $(element).find('[data-test="token"]').map((_, tag) => $(tag).text().trim()).get(),
        postedTime: $(element).find('[data-test="job-pubilshed-date"]').text().trim(),
      }
    }).get()

    return {
      success: true,
      data: jobs,
    }
  } catch (error) {
    console.error('Error scraping Upwork:', error)
    return {
      success: false,
      error: 'Failed to scrape Upwork',
    }
  }
})
