import Image from 'next/image'

import { Heading } from '@/components/ui/Heading'

import { SITE_NAME } from '@/constants/constants'

export function Logo() {
	return (
		<div className='flex items-center gap-2 select-none'>
			<Image
				src='/images/favicon.svg'
				alt='Logo'
				width={38}
				height={38}
			/>
			<Heading>{SITE_NAME}</Heading>
		</div>
	)
}
