'use client'

import * as LucideIcons from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui'

import { IconSelectorDropdown } from './IconSelectorDropdown'

interface IIconSelector {
	selectedIcon?: string
	onSelect: (iconName: string) => void
	placeholder?: ReactNode
}

export function IconSelector({ selectedIcon, onSelect, placeholder }: IIconSelector) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const allIcons = useMemo(() => {
		return Object.entries(LucideIcons)
			.filter(([name]) => name !== 'createLucideIcon' && name !== 'default')
			.map(([name, Icon]) => ({ name, Icon: Icon as ComponentType<any> }))
	}, [])

	const filteredIcons = useMemo(() => {
		if (!searchTerm) return allIcons.slice(0, 100)
		return allIcons
			.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
			.slice(0, 50)
	}, [allIcons, searchTerm])

	const handleIconSelect = (iconName: string) => {
		onSelect(iconName)
		setIsOpen(false)
		setSearchTerm('')
	}

	const SelectedIconComponent = selectedIcon ? (LucideIcons as any)[selectedIcon] : null

	return (
		<div className='relative'>
			<Button
				variant='secondary'
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='w-full'
			>
				{SelectedIconComponent ? (
					<SelectedIconComponent
						size={24}
						className='text-primary'
					/>
				) : (
					<div className='text-gray-400 dark:text-neutral-500'>{placeholder || 'Select Icon'}</div>
				)}
			</Button>

			<IconSelectorDropdown
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				icons={filteredIcons}
				selectedIcon={selectedIcon}
				onIconSelect={handleIconSelect}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
		</div>
	)
}
