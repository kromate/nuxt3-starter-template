import { defineEventHandler, getQuery } from 'h3'
import puppeteer from 'puppeteer'



export default defineEventHandler(async (event) => {
    console.log('scraping');
  const query = getQuery(event)
  const searchTerm = query.q ? encodeURIComponent(query.q as string) : 'seo%20expert'

  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(`https://www.upwork.com/nx/search/jobs/?q=${searchTerm}`, { waitUntil: 'networkidle0' })

      
      const jobs = await page.evaluate(() => {
          const jobElements = document.querySelectorAll("article.job-tile")
          console.log(jobElements);
          return Array.from(jobElements).map((element) => {
              return {
                  title: element.querySelector(".up-n-link")?.textContent?.trim() || '',
                  description: element.querySelector('[data-test="UpCLineClamp JobDescription"]')?.textContent?.trim() || '',
                  link: (element.querySelector('[data-test="job-tile-title-link"]') as HTMLAnchorElement)?.href || '',
                  duration: element.querySelector('[data-test="duration-label"]')?.textContent?.trim() || '',
                  experience: element.querySelector('[data-test="experience-level"]')?.textContent?.trim() || '',
                  hourlyRate: element.querySelector('[data-test="job-type-label"]')?.textContent?.trim() || '',
                  tags: Array.from(element.querySelectorAll('[data-test="token"]')).map(tag => tag.textContent?.trim()) || [],
                  postedTime: element.querySelector('[data-test="job-pubilshed-date"]')?.textContent?.trim() || '',
            }
          })
      })



    await browser.close()

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
