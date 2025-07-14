import type { PropsWithChildren } from 'react'

import { Layout } from '@/components/layout/Layout'

export default function DashboardLayout({ children }: PropsWithChildren) {
	return <Layout>{children}</Layout>
}
