import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import { Providers } from '@/components/layout/Providers'

import { SITE_NAME } from '@/constants/constants'

import './globals.css'

const manrope = Manrope({
	variable: '--font-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	icons: {
		icon: '/images/favicon.svg',
		shortcut: '/images/favicon.svg'
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'TaskHub is a modern task management platform that transforms team productivity through intuitive workflow organization and efficient task handling.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={`${manrope.className} antialiased`}>
				<main>
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	)
}
