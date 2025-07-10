import type { Dispatch, SetStateAction } from 'react'

import { useAddSubtask } from '@/components/modals/subtask/useAddSubtask'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Modal,
	SectionHeading
} from '@/components/ui'

interface IAddSubtaskModal {
	setIsOpen: Dispatch<SetStateAction<boolean>>
	taskId: number
}

export function AddSubtaskModal({ setIsOpen, taskId }: IAddSubtaskModal) {
	const { form, onSubmit } = useAddSubtask({ taskId, setIsOpen })

	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title='Add Subtask' />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-7'
					>
						<div className='flex flex-col gap-7'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter sub task name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex items-center justify-end gap-2.5'>
							<Button
								variant='default'
								type='submit'
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
