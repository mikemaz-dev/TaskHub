import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { getServerAuth } from '@/utils/supabase/get-server-auth'

import { Content } from './content/Content'
import { getServerProfile } from '@/services/profile/profile-server.service'

export async function Layout({ children }: PropsWithChildren) {
	await getServerAuth()

	const userId = await getServerProfile()

	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar />
			<Content>{children}</Content>
		</main>
	)
}
