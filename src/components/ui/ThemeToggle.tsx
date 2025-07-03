'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className='cursor-pointer rounded-full bg-white p-2 shadow-sm transition-colors duration-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
		>
			{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	)
}
