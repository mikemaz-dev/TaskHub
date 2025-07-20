import type { Metadata } from 'next'

import { Seed } from '@/app/admin/Seed'

export const metadata: Metadata = {
	title: 'Admin'
}

export default function Page() {
	return <Seed />
}
