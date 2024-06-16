import type { RouterOptions } from '@nuxt/schema'
import { useSubdomain } from '@/composables/core/subdomain'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => {
    const { ssrContext } = useNuxtApp()
    const subdomain = useSubdomain()
    if (ssrContext?.event.context.subdomain) subdomain.value = ssrContext?.event.context.subdomain
    // REMOVE THIS LINE FOR SUB-DOMAINS TO WORK
    if (subdomain.value) return

    if (subdomain.value) {
      const templateRoute = _routes.filter((i) => i.path.includes('/template/:siteId'))
console.log(templateRoute)
      const templateRouteMapped = templateRoute.map((i) => ({
        ...i,
        path: i.path === '/template/:siteId()' ? i.path.replace('/template/:siteId()', '/') : i.path.replace('/template/:siteId()/', '/')
      }))

      // console.log(templateRouteMapped)
      return templateRouteMapped
    }
  }

}


