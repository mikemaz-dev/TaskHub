'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren, useState } from 'react'

import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						staleTime: 5 * 60 * 1000
					},

					mutations: {
						retry: 1
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
			>
				<LazyMotion features={domAnimation}>{children}</LazyMotion>
				<Toaster />
			</ThemeProvider>
		</QueryClientProvider>
	)
}
