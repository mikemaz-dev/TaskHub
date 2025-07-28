import type { FC } from 'react'

import type { IconProps } from '@/components/animate-ui/icons/icon'

export interface IMenu {
	icon: FC<IconProps<'default'>>
	name: string
	href: string
}
