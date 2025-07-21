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

export function EditTaskModalContent({ form }: { form: UseFormReturn<TTaskFormData> }) {
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
										{value ? format(value.date, 'PPP') : <p>Pick a due date</p>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={value.date}
										onSelect={onChange}
									/>
								</PopoverContent>
							</Popover>
						</div>
					)}
				/>
				<div className='flex items-center justify-between gap-5'>
					<FormField
						control={form.control}
						name='dueDate.startTime'
						render={({ field: { onChange, value } }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='dueDate.startTime'>Start Time</FormLabel>
								<FormControl>
									<Input
										id='time-from'
										type='time'
										step='1'
										value={value}
										onChange={() => onChange()}
										className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dueDate.endTime'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='dueDate.endTime'>End Time</FormLabel>
								<FormControl>
									<Input
										type='time'
										id='time-picker'
										step='1'
										className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
										{...field}
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
