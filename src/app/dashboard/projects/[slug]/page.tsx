import { notFound } from 'next/navigation'

import { ProjectWorkspace } from '@/components/workspace/ProjectWorkspace'

import { getServerAuth } from '@/services/get-server-auth'
import { getServerProjectBySlug } from '@/services/projects/project-server.service'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const { data, error } = await getServerProjectBySlug(slug)
	if (error) throw error
	if (!data?.[0]) notFound()
	const user = await getServerAuth(true)
	return <ProjectWorkspace project={data[0]} userId={user!.id} />
}
