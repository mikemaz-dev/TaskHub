import type { Metadata } from 'next'

import { Dashboard } from '@/pages/Dashboard'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default function Page() {
	return <Dashboard />
}
