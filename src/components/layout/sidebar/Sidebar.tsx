'use client'

import { LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'

import { ProjectItem, SidebarItem, SidebarTopic } from '@/components/layout/sidebar'
import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'
import { Button, SkeletonLoader } from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import { useAuthStore } from '@/store/auth.store'

import { MAIN_MENU_DATA } from '@/data/sidebar/main-menu.data'
import { PROJECTS } from '@/data/sidebar/projects.data'

const DynamicProfileCard = dynamic(
	() => import('./profile/ProfileCard').then(mod => mod.ProfileCard),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Sidebar() {
	const pathName = usePathname()
	const router = useRouter()

	const logout = useAuthStore(state => state.logout)

	const isActive = (sidebarItem: IMenu) => {
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
							onClick={() => {
								logout()
								router.push(Pages.HOME)
							}}
						>
							<LogOut />
						</Button>
					}
				>
					<DynamicProfileCard />
				</SidebarTopic>

				<SidebarTopic title='Main Menu'>
					<ul className='flex flex-col gap-0.5'>
						{MAIN_MENU_DATA.map(item => (
							<SidebarItem
								key={item.name}
								item={item}
								isActive={isActive(item)}
							/>
						))}
					</ul>
				</SidebarTopic>

				<SidebarTopic title='Projects'>
					<ul className='flex flex-col gap-5'>
						{PROJECTS.map(project => (
							<ProjectItem
								key={project.id}
								name={project.name}
								color={project.color}
							/>
						))}
					</ul>
				</SidebarTopic>
			</div>
		</aside>
	)
}
