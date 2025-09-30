import { DynamicIcon } from 'lucide-react/dynamic'
import { type Control, Controller } from 'react-hook-form'

import { Button, Label } from '@/components/ui'

import { AVAILABLE_ICONS } from '@/data/available-icons.data'
import { cn } from '@/utils'
import type { TTaskFormData } from '@/zod-schemes/task.zod'

interface Props {
	control: Control<TTaskFormData>
}

export function TaskModalIconSelector({ control }: Props) {
	return (
		<div className='flex flex-col gap-2.5'>
			<Label htmlFor='icon'>Icons</Label>
			<Controller
				control={control}
				name='icon'
				render={({ field: { onChange, value } }) => (
					<div className='flex items-center gap-2 sm:grid-cols-6'>
						{AVAILABLE_ICONS.map(iconName => {
							const isActive = value === iconName
							return (
								<Button
									key={iconName}
									variant={isActive ? 'default' : 'outline'}
									size='icon'
									onClick={() => onChange(iconName)}
									type='button'
									className={cn(isActive && 'bg-primary text-white')}
								>
									<DynamicIcon
										name={iconName}
										size={20}
										className={cn(
											isActive ? 'text-white' : 'text-foreground opacity-70 dark:text-white'
										)}
									/>
								</Button>
							)
						})}
					</div>
				)}
			/>
		</div>
	)
}
