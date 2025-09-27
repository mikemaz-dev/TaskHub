import { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface IMenu {
	icon: (props: Record<string, unknown>) => ReactNode | Promise<ReactNode>
	name: string
	href: string
}

export interface ISettingsMenu {
	icon: LucideIcon
	name: string
	href: string
}
