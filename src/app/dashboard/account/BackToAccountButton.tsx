import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Pages } from '@/config/public-page.config'

export function BackToAccountButton() {
	return (
		<Link
			href={Pages.ACCOUNT}
			className='base-round flex w-max items-center gap-1 py-1 text-sm opacity-60 transition-all duration-150 hover:opacity-100'
		>
			<ChevronLeft size={20} />
			Back to Account page
		</Link>
	)
}
