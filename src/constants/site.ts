// Set SITE_URL to the canonical production origin when deploying.
export const siteUrl = new URL(process.env.SITE_URL || 'https://taskhub-green.vercel.app')
export const siteDescription = 'Bring your work into focus. Plan tasks, build projects and stay connected with your team in one thoughtful workspace.'
