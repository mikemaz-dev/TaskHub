import type { ReactNode } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { WorkScheduleProvider } from '@/components/workspace/availability/WorkScheduleProvider'
import { PresenceProvider } from '@/components/workspace/availability/PresenceProvider'
import { InboxProvider } from '@/components/workspace/InboxProvider'

import type { TGetProjectsResponse } from '@/types/project/project.types'
import type { TProfile } from '@/types/user/profile.types'

export function Layout({
	children,
	projects,
	profile
}: {
	children: ReactNode
	projects: TGetProjectsResponse
	profile: TProfile
}) {
	return (
		<InboxProvider userId={profile.id}><PresenceProvider userId={profile.id}><WorkScheduleProvider value={profile.work_schedule}>
			<div className='th-shell'>
				<Sidebar projects={projects} profile={profile} />
				<div className='th-content'>{children}</div>
			</div>
		</WorkScheduleProvider></PresenceProvider></InboxProvider>
	)
}
