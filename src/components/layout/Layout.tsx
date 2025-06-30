import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren) {
	return (
		<main className='grid grid-cols-[275px_1fr] xl:grid-cols-none overflow-y-hidden h-screen'>
			<Sidebar />
			<Content>{children}</Content>
		</main>
	)
}
