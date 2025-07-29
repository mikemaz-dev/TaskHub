import { Suspense } from 'react'

import { ConfirmPage } from './ConfirmPage'

export default function Page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ConfirmPage />
		</Suspense>
	)
}
