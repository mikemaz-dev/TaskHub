import type { PropsWithChildren } from 'react'

export function Content({ children }: PropsWithChildren) {
	return <section className='p-6'>{children}</section>
}
