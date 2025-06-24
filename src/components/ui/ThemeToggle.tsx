'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className='p-2 rounded-full bg-white shadow-sm cursor-pointer dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200'
		>
			{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	)
}
