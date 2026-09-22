'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme()
	return (
		<button
			type='button'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className='th-icon-button'
			aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
		>
			{resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}
