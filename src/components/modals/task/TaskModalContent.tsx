import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Check } from 'lucide-react'
import Image from 'next/image'
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
import DropdownButton from '@/components/ui/DropdownButton'

import { getClientAllProfiles } from '@/services/profile/profile-client.service'
import type { TTaskFormData } from '@/zod-schemes/task.zod'

export function TaskModalContent({ form }: { form: UseFormReturn<TTaskFormData> }) {
	const { data: profiles = [] } = useQuery({
		queryKey: ['profiles'],
		queryFn: getClientAllProfiles
	})

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
						<FormItem>
							<FormLabel>Due Date</FormLabel>
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
						</FormItem>
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
				<Controller
					control={form.control}
					name='participants'
					render={({ field: { value = [], onChange } }) => (
						<FormItem>
							<Label>Participants</Label>
							<DropdownButton
								placeholder={
									value.length > 0 ? `${value.length} participants` : 'Select participants'
								}
								items={profiles.map(profile => ({
									value: profile.id,
									label: profile.name,
									children: (
										<div className='flex items-center justify-between gap-2'>
											<div className='flex items-center gap-2'>
												<Image
													src={profile.avatar_path ?? './images/default-avatar.png'}
													alt={profile.name ?? 'Name'}
													width={24}
													height={24}
													className='rounded-full'
												/>
												<span>{profile.name}</span>
											</div>
											{value.includes(profile.id) && (
												<Check
													size={16}
													className='text-primary'
												/>
											)}
										</div>
									),
									onClick: () => {
										if (value.includes(profile.id)) {
											onChange(value.filter((id: string) => id !== profile.id))
										} else {
											onChange([...value, profile.id])
										}
									}
								}))}
							/>
						</FormItem>
					)}
				/>
			</div>
		</div>
	)
}
