import * as React from 'react'

import { cn } from '@/utils/cn.util'

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'base-round border-input bg-background flex w-full min-w-0 border',
				'text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm',
				'transition-colors outline-none',
				'hover:border-accent/80 hover:bg-card',
				'focus:border-ring focus:bg-card focus:ring-ring/60 focus:ring-2',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/60 aria-invalid:ring-1',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
