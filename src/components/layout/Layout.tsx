import type { ReactNode } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { Content } from './content/Content'
import { getServerAuth } from '@/services/get-server-auth'
import { TGetProjectsResponse } from '@/types/project/project.types'
import { TProfile } from '@/types/user/profile.types'

export async function Layout({
	children,
	projects,
	profile
}: {
	children: ReactNode
	projects: TGetProjectsResponse
	profile: TProfile
}) {
	await getServerAuth()

	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar
				projects={projects}
				profile={profile}
			/>
			<Content>{children}</Content>
		</main>
	)
}
