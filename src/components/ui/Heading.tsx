import { type ReactNode, memo } from 'react'

import { cn } from '@/utils/cn.util'

interface IHeading {
	children: ReactNode
	clasName?: string
}

function Heading({ children, clasName }: IHeading) {
	return <h1 className={cn('text-3xl font-bold', clasName)}>{children}</h1>
}

export default memo(Heading)
