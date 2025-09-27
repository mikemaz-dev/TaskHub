'use client'

import { useState } from 'react'

import { Button } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { MAIN_MENU_DATA } from '@/data/sidebar'

export function AppearancePage() {
	const [fontSize, setFontSize] = useState('md')
	const [theme, setTheme] = useState('light')
	const [sidebarItems, setSidebarItems] = useState<string[]>([])

	const toggleSidebarItem = (item: string) =>
		setSidebarItems(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]))

	return (
		<section className='bg-background min-h-screen max-w-6xl p-6'>
			<SectionHeading title='Appearance' />

			<div className='bg-card border-border mt-8 space-y-3 rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md'>
				<Label className='text-sm font-medium'>Font size</Label>
				<RadioGroup
					value={fontSize}
					onValueChange={setFontSize}
					className='flex gap-6'
				>
					{['sm', 'md', 'lg'].map(size => (
						<label
							key={size}
							className='flex cursor-pointer items-center gap-2'
						>
							<RadioGroupItem
								value={size}
								id={`font-${size}`}
							/>
							<span className='capitalize'>
								{size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
							</span>
						</label>
					))}
				</RadioGroup>
			</div>

			{/* Theme */}
			<div className='bg-card border-border mt-6 space-y-3 rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md'>
				<Label className='text-sm font-medium'>Theme</Label>
				<RadioGroup
					value={theme}
					onValueChange={setTheme}
					className='flex gap-6'
				>
					{['light', 'dark'].map(t => (
						<label
							key={t}
							className='flex cursor-pointer items-center gap-2'
						>
							<RadioGroupItem
								value={t}
								id={`theme-${t}`}
							/>
							<span className='capitalize'>{t}</span>
						</label>
					))}
				</RadioGroup>
			</div>

			{/* Customize Sidebar */}
			<div className='bg-card border-border mt-6 space-y-3 rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md'>
				<Label className='text-sm font-medium'>Customize sidebar</Label>
				<div className='flex flex-col gap-3'>
					{MAIN_MENU_DATA.map(item => (
						<label
							key={item.name}
							className='flex cursor-pointer items-center gap-4 capitalize'
						>
							<Checkbox
								checked={sidebarItems.includes(item.name)}
								onCheckedChange={() => toggleSidebarItem(item.name)}
							/>
							<div className='flex items-center gap-2 opacity-90 select-none'>
								<item.icon size={20} />
								<span>{item.name}</span>
							</div>
						</label>
					))}
				</div>
			</div>

			<Button
				className='mt-8'
				variant='outline'
			>
				Save
			</Button>
		</section>
	)
}
