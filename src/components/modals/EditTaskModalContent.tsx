import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'

import {
	Button,
	Calendar,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui'

import type { TTaskFormData } from '@/types/tasks/task.types'

export function EditTaskModalContent({
	form
}: {
	form: UseFormReturn<TTaskFormData, any, undefined>
}) {
	return (
		<div className='flex flex-col gap-7'>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input
								placeholder='Enter task name'
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Controller
				control={form.control}
				name='dueDate'
				render={({ field: { onChange, value } }) => (
					<div className='flex flex-col gap-2'>
						<Label htmlFor='dueDate'>Due Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									data-empty={!value}
									className='data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal'
								>
									<CalendarIcon />
									{value ? format(value, 'PPP') : <p>Pick a due date</p>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={value}
									onSelect={onChange}
								/>
							</PopoverContent>
						</Popover>
					</div>
				)}
			/>
		</div>
	)
}
