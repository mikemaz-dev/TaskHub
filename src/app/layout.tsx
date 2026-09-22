import type { Metadata } from 'next'
import { Geist, Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import { Providers } from '@/components/layout/Providers'

import { siteUrl, siteDescription } from '@/constants/site'
import { SITE_NAME } from '@/constants/constants'

import './globals.css'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] })
const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: { default: 'TaskHub — Bring your work into focus', template: `%s | ${SITE_NAME}` },
	description: siteDescription,
	applicationName: SITE_NAME,
	authors: [{ name: 'Mike Mazurkevich', url: 'https://mikemaz-portfolio.vercel.app/ru' }],
	openGraph: {
		type: 'website', siteName: SITE_NAME, title: 'TaskHub — Bring your work into focus',
		description: siteDescription, locale: 'en_US',
		images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'TaskHub — Projects, people, progress.' }]
	},
	twitter: { card: 'summary_large_image', title: SITE_NAME, description: siteDescription, images: ['/opengraph-image'] }
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geist.className} ${geist.variable} ${outfit.variable} antialiased`}>
				<main>
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	)
}
