'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
		>
			<LazyMotion features={domAnimation}>{children}</LazyMotion>
		</ThemeProvider>
	)
}
