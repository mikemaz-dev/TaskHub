import { cn } from '@/utils/cn.util'

export function ProfileCompletionBadge({ className }: { className?: string }) {
	const progress = 60

	return (
		<div className={cn('flex items-center gap-6 rounded-2xl bg-secondary/20 px-6 py-5 shadow-sm transition-colors',
			className
		)}>
			<div className='relative flex size-24 items-center justify-center'>
				<div
					className='absolute inset-0 rounded-full transition-all duration-700'
					style={{
						background: `conic-gradient(#06b6d4 ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`
					}}
				/>
				<div className='bg-background border-border absolute inset-2 flex items-center justify-center rounded-full border'>
					<span className='text-lg font-semibold'>{progress}%</span>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<span className='font-medium'>Profile completion</span>
				<p className='text-muted-foreground text-sm'>
					Complete your profile to unlock all features
				</p>
			</div>
		</div>
	)
}
