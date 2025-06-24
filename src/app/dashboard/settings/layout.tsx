import type { PropsWithChildren } from 'react'

export default function SettingsLayout({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col min-h-screen'>
			<main>{children}</main>
		</div>
	)
}
