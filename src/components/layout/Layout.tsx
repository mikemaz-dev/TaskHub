import type { PropsWithChildren } from 'react'

import { Providers } from '@/components/layout/Providers'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { getServerAuth } from '@/utils/supabase/get-server-auth'

import { Content } from './content/Content'

export async function Layout({ children }: PropsWithChildren) {
	await getServerAuth()
	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar />
			<Content>
				<Providers>{children}</Providers>
			</Content>
		</main>
	)
}
