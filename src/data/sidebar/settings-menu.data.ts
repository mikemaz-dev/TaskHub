import { Bell, Palette, Shield, User } from 'lucide-react'

import type { ISettingsMenu } from '@/components/layout/sidebar/menu/menu.type'

import { Pages } from '@/config/public-page.config'

export const SETTINGS_MENU_DATA: ISettingsMenu[] = [
	{
		icon: User,
		name: 'Profile',
		href: Pages.PROFILE
	},
	{
		icon: Palette,
		name: 'Appearance',
		href: Pages.PROFILE_APPEARANCE
	},
	{
		icon: Bell,
		name: 'Notifications',
		href: Pages.PROFILE_NOTIFICATIONS
	},
	{
		icon: Shield,
		name: 'Security',
		href: Pages.PROFILE_SECURITY
	}
]
