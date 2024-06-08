module.exports = {
	content: [
		'./src/components/**/*.{js,vue,ts}',
		'./src/layouts/**/*.vue',
		'./src/pages/**/*.vue'
	],
	theme: {
		container: {
			center: true,
			screens: {
				sm: '700px',
				md: '900px',
				lg: '1024px',
				xl: '1280px'
			}
		},
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		}),
		require('@tailwindcss/container-queries')
	]
}
