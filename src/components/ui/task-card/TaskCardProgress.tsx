'use client'

import { m } from 'motion/react'

import { cn } from '@/utils/cn.util'
import { ProgressText, getProgressColor } from '@/utils/task-card-progress-text.util'

import type { TTask } from '@/types/tasks/task.types'

export function TaskCardProgress({ task }: { task: TTask }) {
	const completedSubtasks = task.sub_task?.filter(subtask => subtask.is_completed).length
	const totalSubtasks = task.sub_task?.length

	const progressPercentage =
		totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

	if (progressPercentage === 0) {
		return (
			<div className='flex h-12 w-full items-center justify-center rounded-full border border-dashed border-neutral-300 dark:border-neutral-700'>
				<ProgressText progress={progressPercentage} />
			</div>
		)
	}

	return (
		<div className='relative h-12 w-full rounded-full border-neutral-200 bg-gray-400/18 dark:border dark:border-neutral-200/9 dark:bg-neutral-200/6'>
			<m.div
				className={cn(
					'relative flex h-12 items-center justify-center overflow-hidden rounded-full text-neutral-100',
					getProgressColor(progressPercentage)
				)}
				initial={{ width: 0, opacity: 0 }}
				animate={{ width: `${progressPercentage}%`, opacity: 1 }}
				transition={{
					duration: 1.5,
					ease: 'easeInOut'
				}}
				style={{ width: `${progressPercentage}%` }}
			>
				{progressPercentage > 0 && progressPercentage < 100 && (
					<m.div
						className='absolute inset-0 opacity-15'
						initial={{ scale: 1.5, x: '-10%' }}
						animate={{ scale: 1, x: 0 }}
						transition={{
							duration: 1.5,
							ease: 'easeInOut'
						}}
					>
						<m.div
							className='absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-neutral-100/90 to-neutral-100/10'
							animate={{ x: ['-100%', '100%'] }}
							transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
						/>
					</m.div>
				)}

				<m.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 1.5,
						ease: 'easeInOut'
					}}
				>
					<ProgressText progress={progressPercentage} />
				</m.span>
			</m.div>
		</div>
	)
}
