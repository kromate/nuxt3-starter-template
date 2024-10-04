import { defineEventHandler } from 'h3'
import puppeteer from 'puppeteer'

// interface Job {
//   title: string
//   link: string
//   description: string
//   budget: string
//   postedTime: string
// }

export default defineEventHandler(async (event) => {
    console.log('scraping');
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.upwork.com/nx/search/jobs/?q=seo%20expert', { waitUntil: 'networkidle0' })

    // const jobs: Job[] = await page.evaluate(() => {
    //     const jobElements = document.querySelectorAll('section[data-test="job-tile"]')
    //     console.log(jobElements);
    //   return Array.from(jobElements).map((element) => {
    //     const titleElement = element.querySelector('h3 a')
    //     const descriptionElement = element.querySelector('[data-test="job-description"]')
    //     const budgetElement = element.querySelector('[data-test="budget"]')
    //     const postedTimeElement = element.querySelector('[data-test="posted-on"]')

    //     return {
    //       title: titleElement?.textContent?.trim() || '',
    //       link: (titleElement as HTMLAnchorElement)?.href || '',
    //       description: descriptionElement?.textContent?.trim() || '',
    //       budget: budgetElement?.textContent?.trim() || 'Not specified',
    //       postedTime: postedTimeElement?.textContent?.trim() || '',
    //     }
    //   })
      // })
      
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
