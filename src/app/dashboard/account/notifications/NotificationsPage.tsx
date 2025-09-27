'use client'

import { useState } from 'react'

import SectionHeading from '@/components/ui/SectionHeading'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function NotificationsPage() {
	const [settings, setSettings] = useState({
		emailMentions: true,
		emailSummary: false,
		pushTaskUpdates: true,
		pushReminders: true,
		inAppBadges: true,
		inAppToasts: false
	})

	const toggle = (key: keyof typeof settings) =>
		setSettings(prev => ({ ...prev, [key]: !prev[key] }))

	return (
		<section className='bg-background min-h-screen max-w-4xl p-6'>
			<SectionHeading title='Notifications' />

			<div className='mt-8 grid gap-6 md:grid-cols-2'>
				<div className='bg-card border-border rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md'>
					<h2 className='text-foreground mb-4 text-lg font-semibold'>Email</h2>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center justify-between'>
							<Label className='text-sm'>Mentions & replies</Label>
							<Switch
								checked={settings.emailMentions}
								onCheckedChange={() => toggle('emailMentions')}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<Label className='text-sm'>Weekly summary</Label>
							<Switch
								checked={settings.emailSummary}
								onCheckedChange={() => toggle('emailSummary')}
							/>
						</div>
					</div>
				</div>

				<div className='bg-card border-border rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md'>
					<h2 className='text-foreground mb-4 text-lg font-semibold'>Push</h2>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center justify-between'>
							<Label className='text-sm'>Task updates</Label>
							<Switch
								checked={settings.pushTaskUpdates}
								onCheckedChange={() => toggle('pushTaskUpdates')}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<Label className='text-sm'>Reminders</Label>
							<Switch
								checked={settings.pushReminders}
								onCheckedChange={() => toggle('pushReminders')}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
