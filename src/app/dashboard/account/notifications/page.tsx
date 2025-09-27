import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { NotificationsPage } from './NotificationsPage'

export const metadata: Metadata = {
	title: 'Notifications',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <NotificationsPage />
}
