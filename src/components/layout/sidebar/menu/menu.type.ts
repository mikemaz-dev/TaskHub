import type { ReactNode } from 'react'

export interface IMenu {
	icon: (props: any) => ReactNode | Promise<ReactNode>
	name: string
	href: string
}
