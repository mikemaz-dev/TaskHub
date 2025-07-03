import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren) {
	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar />
			<Content>{children}</Content>
		</main>
	)
}
