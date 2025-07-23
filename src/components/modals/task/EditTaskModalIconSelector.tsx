import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui'

import { AVAILABLE_ICONS } from '@/data/available-icons.data'
import type { TTask } from '@/types/tasks/task.types'
import type { TTaskFormData } from '@/zod-schemes/task.zod'

interface Props {
	task: TTask
	form: UseFormReturn<TTaskFormData>
	selectedIcon: string
}

export function EditTaskModalIconSelector({ task, selectedIcon, form }: Props) {
	return (
		<div className='flex flex-col gap-2.5'>
			<label className='text-sm font-medium'>Icons</label>
			<div className='flex gap-2'>
				<Button size='lg'>
					<DynamicIcon
						name={task.icon as IconName}
						size={30}
					/>
				</Button>
				<Controller
					control={form.control}
					name='icon'
					render={({ field: { onChange } }) => (
						<div className='flex items-center gap-2 sm:grid-cols-6'>
							{AVAILABLE_ICONS.map(iconName => (
								<Button
									variant='outline'
									size='lg'
									key={iconName}
									onClick={() => onChange(iconName)}
									className={`hover:bg-accent rounded-md transition-colors ${
										selectedIcon === iconName ? 'bg-accent' : ''
									}`}
								>
									<DynamicIcon
										name={iconName}
										size={40}
										className='text-foreground'
									/>
								</Button>
							))}
						</div>
					)}
				/>
			</div>
		</div>
	)
}
