'use client'

import { Check } from 'lucide-react'
import { m } from 'motion/react'
import { useMemo } from 'react'

import { cn } from '@/utils/cn.util'

import type { ITask } from '@/types/tasks/task.types'

export function TaskCardProgress({ task }: { task: ITask }) {
	const completedSubtasks = task.subTasks?.filter(subtask => subtask.isCompleted).length
	const totalSubtasks = task.subTasks?.length
	const progressPercentage =
		totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

	const progressText = useMemo(() => {
		if (progressPercentage === 100) {
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
		return <span className='text-sm font-semibold select-none'>{progressPercentage}%</span>
	}, [progressPercentage])

	const displayWidth = progressPercentage === 0 ? 18 : progressPercentage

	return (
		<div className='relative h-12 w-full rounded-full bg-gray-400/18 dark:bg-neutral-200/20'>
			<m.div
				className={cn(
					'relative flex h-12 items-center justify-center overflow-hidden rounded-full text-neutral-100',
					{
						'bg-gray-400 dark:bg-neutral-400': progressPercentage === 0,
						'bg-indigo-500': progressPercentage > 0 && progressPercentage <= 50,
						'bg-amber-500': progressPercentage > 50 && progressPercentage < 100,
						'bg-teal-500': progressPercentage === 100
					}
				)}
				initial={{ width: 0, opacity: 0 }}
				animate={{ width: `${displayWidth}%`, opacity: 1 }}
				transition={{
					duration: 1.5,
					ease: 'easeInOut'
				}}
				style={{ width: `${displayWidth}%` }}
			>
				{progressPercentage > 0 && (
					<m.div
						className='absolute inset-0 opacity-15'
						initial={{ scale: 1.5, x: '-10%' }}
						animate={{ scale: 1, x: 0 }}
						transition={{
							duration: 1.5,
							ease: 'easeInOut'
						}}
					>
						<div
							className='h-full w-full rounded-full'
							style={{
								backgroundImage:
									'repeating-linear-gradient(-45deg, transparent, transparent 8px, white 8px, white 16px)'
							}}
						/>
					</m.div>
				)}

				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 1.5,
						ease: 'easeInOut'
					}}
					className='relative z-20'
				>
					{progressText}
				</m.div>
			</m.div>
		</div>
	)
}
