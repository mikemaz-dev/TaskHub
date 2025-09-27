import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { AppearancePage } from './AppearancePage'

export const metadata: Metadata = {
	title: 'Appearance',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <AppearancePage />
}
