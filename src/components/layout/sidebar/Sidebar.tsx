'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { ProfileCard, ProjectItem, SidebarItem, SidebarTopic } from '@/components/layout/sidebar'
import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'

import { MAIN_MENU_DATA } from '@/data/sidebar/main-menu.data'
import { PROJECTS } from '@/data/sidebar/projects.data'

export function Sidebar() {
	const pathName = usePathname()

	const isActive = (sidebarItem: IMenu) => {
		return !!match(sidebarItem.href)(pathName)
	}

	return (
		<aside className='bg-white/80 dark:bg-neutral-800 py-6 px-4 shadow-sm md:hidden lg:hidden xl:hidden whitespace-nowrap overflow-hidden'>
			<div className='flex flex-col gap-5'>
				<SidebarTopic title='Account'>
					<ProfileCard />
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
