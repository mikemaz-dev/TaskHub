import { Messages } from '@/components/workspace/Messages'

import { getTeamNetwork } from '@/services/team/team-server.service'

export const metadata = { title: 'Messages' }
export default async function Page({ searchParams }: { searchParams: Promise<{ project?: string; contact?: string }> }) {
	const [params, network] = await Promise.all([searchParams, getTeamNetwork()])
	return <Messages key={`${params.project || 'general'}:${params.contact || ''}`} network={network} />
}
