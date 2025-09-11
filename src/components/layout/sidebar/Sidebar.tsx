'use client'

import { Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'

import { ProfileCard, ProjectItem, SidebarItem, SidebarTopic } from '@/components/layout/sidebar'
import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'
import { Button } from '@/components/ui'
import { LogoutIcon } from '@/components/ui/icons/logout'

import { Pages } from '@/config/public-page.config'

import { createClient } from '@/utils/supabase/client'

import { MAIN_MENU_DATA } from '@/data/sidebar/main-menu.data'
import { TGetProjectsResponse } from '@/types/project/project.types'

export function Sidebar({ projects }: { projects: TGetProjectsResponse }) {
	const pathName = usePathname()
	const router = useRouter()

	const signOut = async () => {
		const { error } = await createClient().auth.signOut()

		if (!error) router.push(Pages.HOME)
	}

	const isActive = (sidebarItem: IMenu) => {
		if (!pathName) return null

		return !!match(sidebarItem.href)(pathName)
	}

	if (pathName === Pages.LOGIN || pathName === Pages.SIGNUP || pathName === Pages.HOME) return null

	return (
		<aside className='overflow-hidden bg-white/80 px-4 py-6 whitespace-nowrap shadow-sm md:hidden lg:hidden xl:hidden dark:bg-neutral-800'>
			<div className='flex flex-col gap-5'>
				<SidebarTopic
					title='Account'
					rightSide={
						<Button
							variant='ghost'
							size='sm'
							onClick={signOut}
							aria-label='Logout'
							className='text-foreground'
						>
							<LogoutIcon />
						</Button>
					}
				>
					<ProfileCard />
				</SidebarTopic>

				<SidebarTopic title='Main Menu'>
					<ul className='flex flex-col gap-0.5'>
						{MAIN_MENU_DATA.map(item => (
							<SidebarItem
								key={item.name}
								item={item}
								isActive={isActive(item) as boolean}
							/>
						))}
					</ul>
				</SidebarTopic>

				<SidebarTopic
					title='Projects'
					rightSide={
						<Button
							size='icon'
							variant='ghost'
						>
							<Plus />
						</Button>
					}
				>
					<ul className='flex flex-col gap-1.5'>
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
					</ul>
				</SidebarTopic>
			</div>
		</aside>
	)
}
