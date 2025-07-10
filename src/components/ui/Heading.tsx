import type { ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

interface IHeading {
	children: ReactNode
	clasName?: string
}

export function Heading({ children, clasName }: IHeading) {
	return <h1 className={cn('text-3xl font-bold', clasName)}>{children}</h1>
}
