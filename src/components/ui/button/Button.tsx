import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/cn.util'

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap base-round text-sm font-medium cursor-pointer transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-95 hover:shadow-md',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-95 hover:shadow-md',
				outline:
					'border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-95 hover:shadow-md',
				ghost:
					'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground shadow-none',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-5',
				sm: 'h-8 px-2.5 gap-1.5',
				lg: 'h-12 px-5.5',
				icon: 'h-10 w-10 p-2'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
