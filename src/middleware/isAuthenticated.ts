import { useUser } from '@/composables/auth/user'

export default async function isAuthenticated(route: any) {
	const { isLoggedIn } = useUser()

	// setTimeout(() => {
		if (!isLoggedIn.value && route.path !== '/auth/login') {
			useUser().redirectUrl.value = route.fullPath
			return navigateTo('/auth/login')
		}
	// }, 50)
}
