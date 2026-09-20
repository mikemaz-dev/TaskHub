import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

import { Layout } from '@/components/layout/Layout'

import { getServerProfile } from '@/services'
import { getServerAuth } from '@/services/get-server-auth'
import { getServerProjects } from '@/services/projects/project-server.service'

export const metadata = { robots: { index: false, follow: false } }

export default async function DashboardLayout({ children }: PropsWithChildren) {
	await getServerAuth(true)

	const [projects, profile] = await Promise.all([getServerProjects(), getServerProfile()])

	if (!profile.name) redirect('/onboarding')
	if (projects.error) throw new Error('Unable to load your projects. Please try again.')

	return (
		<Layout projects={projects.data ?? []} profile={profile}>
			{children}
		</Layout>
	)
}
