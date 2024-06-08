// import { is_dev } from './src/composables/utils/system'




export default {
    keepalive: true,
    head: {
        title: 'NStarter - Less set-up, more shipping',
        htmlAttrs: { lang: 'en' },
        viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
        bodyAttrs: { class: 'overflow-x-hidden' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                'http-equiv': 'Content-Security-Policy',
                content: 'upgrade-insecure-requests'
            },
            {
                name: 'title',
                content: 'NStarter - Less set-up, more shipping'
            },
            {
                name: 'description',
                content: 'A modern, feature-rich starter template for Nuxt 3 projects, integrating Firebase, Lucide Icons, Radix Vue, and TailwindCSS.'
            },
            {
                name: 'twitter:title',
                content: 'NStarter - Less set-up, more shipping'
            },
            { name: 'twitter:image', content: 'https://nuxt3-starter-template-five.vercel.app/og.png' },
            {
                name: 'twitter:description',
                content: 'A modern, feature-rich starter template for Nuxt 3 projects, integrating Firebase, Lucide Icons, Radix Vue, and TailwindCSS.'
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@kromate_24' },
            { name: 'twitter:creator', content: '@kromate_24' },
            {
                property: 'og:title',
                content: 'NStarter | Less set-up, more shipping'
            },
            { name: 'google-site-verification', content: 'tWttF6w3RHPlNPm5u7KSRgh4lgkRUZ2Bwl6QzECjY18' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://NStarter.xyz/' },
            { property: 'og:image', content: 'https://nuxt3-starter-template-five.vercel.app/og.png' },
            { property: 'og:image:secure_url', content: 'https://nuxt3-starter-template-five.vercel.app/og.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:site_name', content: 'NStarter' },
            {
                property: 'og:description',
                content: 'A modern, feature-rich starter template for Nuxt 3 projects, integrating Firebase, Lucide Icons, Radix Vue, and TailwindCSS.'
            },

            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
            { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true }

        ]
    }

}



