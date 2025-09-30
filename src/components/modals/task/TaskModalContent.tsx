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

import type { TTaskFormData } from '@/zod-schemes/task.zod'

export function TaskModalContent({ form }: { form: UseFormReturn<TTaskFormData> }) {
	const parseDate = (dateString: string): Date | undefined => {
		if (!dateString) return undefined

		const date = new Date(dateString)

		if (isNaN(date.getTime())) {
			console.error('Incorrect date format:', dateString)
			return undefined
		}

		return date
	}

	return (
		<div className='flex flex-col gap-6.5'>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input
								placeholder='Enter task name'
								autoFocus={false}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className='flex flex-col gap-6'>
				<Controller
					control={form.control}
					name='due_date'
					render={({ field: { onChange, value } }) => (
						<div className='flex flex-col gap-2'>
							<Label htmlFor='dueDate'>Due Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										data-empty={!value}
										className='data-[empty=true]:text-muted-foreground text-foreground w-full justify-start text-left font-normal'
									>
										<CalendarIcon />
										{value ? format(value, 'PPP') : <p>Pick a due date</p>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={parseDate(value)}
										onSelect={date => onChange(format(date ?? '', 'y-MM-d'))}
									/>
								</PopoverContent>
							</Popover>
						</div>
					)}
				/>
				<div className='flex items-center justify-between gap-5'>
					<FormField
						control={form.control}
						name='start_time'
						render={({ field: { onChange, value } }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='start_time'>Start Time</FormLabel>
								<FormControl>
									<Input
										id='time-from'
										type='time'
										step='1'
										value={value || ''}
										onChange={event => onChange(event.target.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='end_time'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='end_time'>End Time</FormLabel>
								<FormControl>
									<Input
										type='time'
										id='time-picker'
										step='1'
										value={field.value || ''}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	)
}
