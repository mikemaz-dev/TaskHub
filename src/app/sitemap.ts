import type { MetadataRoute } from 'next'
import { siteUrl } from '@/constants/site'
export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: siteUrl.href }]
}
