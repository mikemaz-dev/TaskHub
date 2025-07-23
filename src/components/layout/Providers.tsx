'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
			>
				<LazyMotion features={domAnimation}>
					{children}
					<Toaster />
				</LazyMotion>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
