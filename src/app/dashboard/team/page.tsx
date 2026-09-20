import { Team } from '@/components/workspace/Team'

import { getTeamNetwork } from '@/services/team/team-server.service'

export const metadata = { title: 'Team' }
export default async function Page() {
	return <Team network={await getTeamNetwork()} />
}
