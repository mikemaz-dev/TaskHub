import { LayoutDashboard } from 'lucide-react'

import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'
import {
	BookTextIcon,
	CalendarDaysIcon,
	ChartColumnDecreasingIcon,
	FoldersIcon,
	MessageCircleMoreIcon,
	UsersIcon
} from '@/components/ui/icons'

import { Pages } from '@/config/public-page.config'

export const MAIN_MENU_DATA: IMenu[] = [
	{
		icon: LayoutDashboard,
		name: 'Dashboard',
		href: Pages.DASHBOARD
	},
	{
		icon: MessageCircleMoreIcon,
		name: 'Messages',
		href: Pages.MESSAGES
	},
	{
		icon: ChartColumnDecreasingIcon,
		name: 'Insight',
		href: Pages.MESSAGES
	},
	{
		icon: FoldersIcon,
		name: 'Projects',
		href: Pages.PROJECTS
	},
	{
		icon: UsersIcon,
		name: 'Team',
		href: Pages.TEAM
	},
	{
		icon: CalendarDaysIcon,
		name: 'Schedule',
		href: Pages.SCHEDULE
	},
	{
		icon: BookTextIcon,
		name: 'Report',
		href: Pages.REPORT
	}
]
