import type { PropsWithChildren } from 'react'

import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/components/layout/Providers'

import { getServerAuth } from '@/services/get-server-auth'

export default async function DashboardLayout({ children }: PropsWithChildren) {
	await getServerAuth(true)

	return (
		<Layout>
			<Providers>{children}</Providers>
		</Layout>
	)
}
