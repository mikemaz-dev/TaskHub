import { DynamicIcon } from 'lucide-react/dynamic'
import { type Control, Controller } from 'react-hook-form'

import { Button, Label } from '@/components/ui'

import { AVAILABLE_ICONS } from '@/data/available-icons.data'
import type { TTaskFormData } from '@/zod-schemes/task.zod'

interface Props {
	control: Control<TTaskFormData>
}

export function EditTaskModalIconSelector({ control }: Props) {
	return (
		<div className='flex flex-col gap-2.5'>
			<Label htmlFor='icon'>Icons</Label>
			<Controller
				control={control}
				name='icon'
				render={({ field: { onChange, value } }) => (
					<div className='flex items-center gap-2 sm:grid-cols-6'>
						{AVAILABLE_ICONS.map(iconName => (
							<Button
								key={iconName}
								variant={value === iconName ? 'default' : 'outline'}
								size='lg'
								onClick={() => onChange(iconName)}
								type='button'
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
	)
}
