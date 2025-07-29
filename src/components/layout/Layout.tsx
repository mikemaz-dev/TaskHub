import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { Content } from './content/Content'
import { getServerAuth } from '@/services/get-server-auth'

export async function Layout({ children }: PropsWithChildren) {
	await getServerAuth()

	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar />
			<Content>{children}</Content>
		</main>
	)
}
