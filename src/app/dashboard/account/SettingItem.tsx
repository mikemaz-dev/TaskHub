import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
	link?: string
	icon: ReactNode
	title: string
	description: string
}

export function SettingItem({ link, icon, title, description }: Props) {
	return (
		<Link
			href={link ? link : ''}
			className='group border-border base-round bg-card hover:border-muted-foreground/40 hover:bg-accent/50 flex cursor-pointer items-center justify-between border px-5 py-4 text-left transition'
		>
			<div className='flex items-center gap-4'>
				<div className='bg-muted flex size-10 items-center justify-center rounded-lg'>
					{icon}
				</div>
				<div className='flex flex-col'>
					<span className='font-medium'>{title}</span>
					<span className='text-muted-foreground text-sm'>{description}</span>
				</div>
			</div>
		</Link>
	)
}
