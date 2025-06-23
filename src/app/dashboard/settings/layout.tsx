import type { PropsWithChildren } from 'react'

export default function SettingsLayout({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800'>
			<main>{children}</main>
		</div>
	)
}
