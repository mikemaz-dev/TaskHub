interface ISectionHeading {
	title: string
}

export function SectionHeading({ title }: ISectionHeading) {
	return <h2 className='text-2xl font-semibold transition-colors duration-300'>{title}</h2>
}
