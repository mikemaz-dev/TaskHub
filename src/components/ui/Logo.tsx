import { Activity } from 'lucide-react'
import Link from 'next/link'

export function Logo() {
	return (
		<Link href='/' className='th-logo'>
			<span>
				<Activity size={17} aria-hidden='true' />
			</span>
			TaskHub
		</Link>
	)
}
