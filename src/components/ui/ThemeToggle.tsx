'use client'

import { useTheme } from 'next-themes'

import { MoonIcon } from '@/components/ui/icons/moon'
import { SunIcon } from '@/components/ui/icons/sun'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className='text-foreground cursor-pointer base-round bg-secondary p-2.5 shadow-sm'
			aria-label={`Toggle ${theme} theme`}
		>
			{theme === 'dark' ? <SunIcon size={22} /> : <MoonIcon size={22} />}
		</button>
	)
}
