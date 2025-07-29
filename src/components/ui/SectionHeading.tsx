import { memo } from 'react'

interface ISectionHeading {
	title: string
}

function SectionHeading({ title }: ISectionHeading) {
	return (
		<h2 className='text-2xl font-semibold transition-colors duration-300 md:text-xl'>{title}</h2>
	)
}

export default memo(SectionHeading)
