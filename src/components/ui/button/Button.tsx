'use client'

import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { ButtonClassnameVariants } from '@/components/ui/button/ButtonClassnameVariants'

import { cn } from '@/utils/cn.util'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary'
	children: ReactNode
	isLoading?: boolean
}

export function Button({ variant, children, isLoading, className, disabled, ...props }: IButton) {
	const baseStyles =
		'px-4 py-2 rounded-xl cursor-pointer font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'

	const isDisabled = disabled || isLoading

	return (
		<button
			className={cn(baseStyles, ButtonClassnameVariants[variant], className)}
			disabled={isDisabled}
			{...props}
		>
			{isLoading && (
				<Loader2
					size={16}
					className='animate-spin'
				/>
			)}
			{children}
		</button>
	)
}
