import { Check } from 'lucide-react'

export function ProgressText({ progress }: { progress: number }) {
	if (progress === 100) {
		return (
			<div className='flex items-center gap-1.5'>
				<div className='flex h-4 w-4 items-center justify-center rounded-full bg-white text-white select-none'>
					<Check
						size={10}
						absoluteStrokeWidth
						className='text-teal-500'
					/>
				</div>
				<span className='text-sm font-semibold select-none'>Done</span>
			</div>
		)
	}

	if (progress === 0) {
		return (
			<span className='text-sm font-semibold text-neutral-500 italic select-none dark:text-neutral-400'>
				Not started
			</span>
		)
	}

	return <span className='text-sm font-semibold select-none'>{progress}%</span>
}

export function getProgressColor(progress: number) {
	switch (true) {
		case progress === 100:
			return 'bg-teal-500'
		case progress > 50:
			return 'bg-yellow-500/75'
		case progress > 0:
			return 'bg-indigo-500'
		default:
			return 'bg-gray-400 dark:bg-neutral-400'
	}
}
