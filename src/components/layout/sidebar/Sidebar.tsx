import { ProfileCard, ProjectItem, SidebarItem, SidebarTopic } from '@/components/layout/sidebar'

import { MAIN_MENU_DATA } from '@/data/sidebar/main-menu.data'
import { PROJECTS } from '@/data/sidebar/projects.data'

export function Sidebar() {
	return (
		<aside className='bg-white/80 dark:bg-neutral-800 py-6 px-4 shadow-sm whitespace-nowrap overflow-hidden'>
			<div className='flex flex-col gap-5'>
				<SidebarTopic title='Account'>
					<ProfileCard />
				</SidebarTopic>

				<SidebarTopic title='Main Menu'>
					<ul className='flex flex-col gap-0.5'>
						{MAIN_MENU_DATA.map(item => (
							<SidebarItem
								key={item.name}
								icon={
									<item.icon
										size={21}
										absoluteStrokeWidth={true}
									/>
								}
								href={item.href}
								name={item.name}
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
