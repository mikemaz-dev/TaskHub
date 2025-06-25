import {
	Bolt,
	CalendarRange,
	ChartColumnDecreasing,
	LayoutDashboard,
	MessageCircleMore,
	NotebookText,
	Users
} from 'lucide-react'

import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'

import { Pages } from '@/config/public-page.config'

export const MAIN_MENU_DATA: IMenu[] = [
	{
		icon: LayoutDashboard,
		name: 'Dashboard',
		href: Pages.DASHBOARD
	},
	{
		icon: MessageCircleMore,
		name: 'Messages',
		href: Pages.MESSAGES
	},
	{
		icon: ChartColumnDecreasing,
		name: 'Insight',
		href: Pages.MESSAGES
	},
	{
		icon: Users,
		name: 'Team',
		href: Pages.TEAM
	},
	{
		icon: CalendarRange,
		name: 'Schedule',
		href: Pages.SCHEDULE
	},
	{
		icon: NotebookText,
		name: 'Report',
		href: Pages.REPORT
	},
	{
		icon: Bolt,
		name: 'Settings',
		href: Pages.REPORT
	}
]
