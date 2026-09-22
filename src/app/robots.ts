import type { MetadataRoute } from 'next'
import { siteUrl } from '@/constants/site'
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/auth', '/onboarding', '/sign-in', '/signup'] },
		sitemap: new URL('/sitemap.xml', siteUrl).href
	}
}
