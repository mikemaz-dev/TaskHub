import type { Metadata } from 'next'

import { Auth } from '@/pages/Auth'

export const metadata: Metadata = {
	title: 'Auth'
}

export default function Page() {
	return <Auth type='signup' />
}
