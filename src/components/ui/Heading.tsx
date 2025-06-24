import type { ReactNode } from 'react'

interface IHeading {
	children: ReactNode
}

export function Heading({ children }: IHeading) {
	return <h1 className='text-3xl font-semibold'>{children}</h1>
}
