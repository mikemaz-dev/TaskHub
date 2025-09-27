import { Bell, Lock, LogOut, Palette, Settings, User } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pages } from '@/config/public-page.config'

import { SettingItem } from './SettingItem'

export const metadata: Metadata = {
	title: 'Account',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<section className='bg-background hide-scrollbar flex h-screen flex-col gap-12 overflow-y-scroll px-6 xl:w-screen'>
			<Header title='Account Settings' />
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-2'>
					<h3 className='text-muted-foreground text-sm font-semibold tracking-wide uppercase'>
						General
					</h3>
					<div className='grid gap-3'>
						<SettingItem
							link={Pages.PROFILE}
							icon={
								<User
									size={22}
									className='text-muted-foreground group-hover:text-primary transition-colors duration-150 group-hover:opacity-100'
								/>
							}
							title='Profile'
							description='Manage your personal information'
						/>
						<SettingItem
							link={Pages.PROFILE_APPEARANCE}
							icon={
								<Palette
									size={22}
									className='text-muted-foreground group-hover:text-primary transition-colors duration-150'
								/>
							}
							title='Appearance'
							description='Theme, font size, interface customization'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h3 className='text-muted-foreground text-sm font-semibold tracking-wide uppercase transition-colors duration-150'>
						Privacy & Security
					</h3>
					<div className='grid gap-3'>
						<SettingItem
							link={Pages.PROFILE_SECURITY}
							icon={
								<Lock
									size={22}
									className='text-muted-foreground group-hover:text-primary transition-colors duration-150'
								/>
							}
							title='Password & Security'
							description='Change password, 2FA, and more'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h3 className='text-muted-foreground text-sm font-semibold tracking-wide uppercase'>
						Preferences
					</h3>
					<div className='grid gap-3'>
						<SettingItem
							link={Pages.PROFILE_NOTIFICATIONS}
							icon={
								<Bell
									size={22}
									className='text-muted-foreground group-hover:text-primary transition-colors duration-150'
								/>
							}
							title='Notifications'
							description='Email, push, and system notifications'
						/>
						<SettingItem
							link={Pages.PROFILE_ADVANCED}
							icon={
								<Settings
									size={22}
									className='text-muted-foreground group-hover:text-primary transition-colors duration-150'
								/>
							}
							title='Advanced'
							description='Developer and beta settings'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h3 className='text-muted-foreground text-sm font-semibold tracking-wide uppercase'>
						Other
					</h3>
					<div className='grid gap-3'>
						<SettingItem
							icon={
								<LogOut
									size={22}
									className='text-muted-foreground transition-colors duration-150'
								/>
							}
							title='Log out'
							description='Sign out of your account'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
