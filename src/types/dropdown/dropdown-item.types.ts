import { ReactNode } from 'react'

export interface IDropdownItem {
	label: string | null
	value?: string | null
	children?: ReactNode | null
	onClick?: () => void
}
