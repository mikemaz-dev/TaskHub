import cn from 'clsx'
import type React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
}

export function Field({ label, error, ...props }: Props) {
	return (
		<div>
			<label>
				<span className='mb-2 block font-semibold text-neutral-400'>{label}</span>
				<input
					className={cn(
						'focus:border-primary w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-3 py-2 transition-colors focus:ring-0 focus:outline-none dark:border-neutral-500/60 dark:bg-neutral-600/50',
						error ? 'border-red-500' : 'dark:border-border border-borderWhite'
					)}
					{...props}
				/>
			</label>
			{error && <span className='mt-1 text-sm text-red-500'>{error}</span>}
		</div>
	)
}
