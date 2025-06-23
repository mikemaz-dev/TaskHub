import type { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

export default function SettingsLayout({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800'>
			<Sidebar />
			<main>{children}</main>
		</div>
	)
}
