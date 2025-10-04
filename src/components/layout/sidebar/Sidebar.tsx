'use client'

import { Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { ProfileCard, ProjectItem, SidebarItem, SidebarTopic } from '@/components/layout/sidebar'
import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'
import { Button } from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import { MAIN_MENU_DATA } from '@/data/sidebar/main-menu.data'
import { SETTINGS_MENU_DATA } from '@/data/sidebar/settings-menu.data'
import { TGetProjectsResponse } from '@/types/project/project.types'
import { TProfile } from '@/types/user/profile.types'

export function Sidebar({
	projects,
	profile
}: {
	projects: TGetProjectsResponse
	profile: TProfile
}) {
	const pathName = usePathname()

	const isActive = (sidebarItem: IMenu) => {
		if (!pathName) return null

		return !!match(sidebarItem.href)(pathName)
	}

	const matcher = match([
		Pages.ACCOUNT,
		Pages.PROFILE,
		Pages.PROFILE_APPEARANCE,
		Pages.PROFILE_NOTIFICATIONS,
		Pages.PROFILE_SECURITY,
		Pages.PROFILE_ADVANCED
	])

	const isSettingsPage = pathName ? !!matcher(pathName) : false

	if (pathName === Pages.LOGIN || pathName === Pages.SIGNUP || pathName === Pages.HOME) return null

	return (
		<aside className='border-border/55 bg-sidebar/40 flex flex-col gap-4.5 overflow-hidden border-r px-3.5 py-7 text-base whitespace-nowrap shadow-sm md:hidden lg:hidden xl:hidden'>
			<ProfileCard profile={profile} />
			<div className='flex flex-col gap-5'>
				<SidebarTopic title={isSettingsPage ? '' : 'Main Menu'}>
					{isSettingsPage
						? SETTINGS_MENU_DATA.map(item => (
								<SidebarItem
									key={item.name}
									item={item}
									isActive={isActive(item) as boolean}
								/>
							))
						: MAIN_MENU_DATA.map(item => (
								<SidebarItem
									key={item.name}
									item={item}
									isActive={isActive(item) as boolean}
								/>
							))}
				</SidebarTopic>

				{!isSettingsPage && (
					<SidebarTopic
						title='Projects'
						link={Pages.PROJECTS}
						rightSide={
							<Button
								size='sm'
								variant='ghost'
							>
								<Plus />
							</Button>
						}
					>
						{projects.map(project => {
							if (!project) return null
							return (
								<ProjectItem
									key={project.id}
									name={project.name as string}
									slug={project.slug as string}
									color={project.color as string}
								/>
							)
						})}
					</SidebarTopic>
				)}
			</div>
		</aside>
	)
}
