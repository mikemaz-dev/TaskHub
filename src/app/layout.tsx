import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'
import { SITE_NAME } from '@/constants'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	icons: {
		icon: '/images/favicon.svg',
		shortcut: '/images/favicon.svg'
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s - ${SITE_NAME}`
	},
	description: 'The best task management app for productive teams.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	)
}
