import { Suspense } from 'react'

import { ConfirmPage } from './ConfirmPage'

export const metadata = { title: 'Confirm your email' }

export default function Page() {
	return (
		<Suspense fallback={<div className='th-auth'><section className='th-panel th-auth-card' role='status'>Opening your workspace…</section></div>}>
			<ConfirmPage />
		</Suspense>
	)
}
