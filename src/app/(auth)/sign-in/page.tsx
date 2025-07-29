import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Auth } from '@/components/pages/Auth'

import { Pages } from '@/config/public-page.config'

import { getServerAuth } from '@/services/get-server-auth'

export const metadata: Metadata = {
	title: 'Auth'
}

export default async function Page() {
	const user = await getServerAuth()

	if (user) return redirect(Pages.DASHBOARD)

	return <Auth />
}
