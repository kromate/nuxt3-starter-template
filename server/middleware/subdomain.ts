export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || 'taaskly.site'

  const mainDomain = ['localhost:3000', 'taaskly.site']

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.taaskly.xyz', '')
        : hostname.replace('.localhost:3000', '')

    context.subdomain = currentHost
  }
})
