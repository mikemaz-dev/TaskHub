import * as React from 'react'

import { cn } from '@/utils/cn.util'

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'flex w-full min-w-0 base-round border border-input bg-background',
				'px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
				'transition-colors outline-none',
				'hover:border-accent/80 hover:bg-card',
				'focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/60',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/60',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
