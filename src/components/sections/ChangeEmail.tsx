import { Pencil } from 'lucide-react'

import { Button, Label } from '@/components/ui'

import { TProfile } from '@/types/user/profile.types'

interface Props {
	email: Pick<TProfile, 'email'>
}

export function ChangeEmail({ email }: Props) {
	return (
		<div className='space-y-1'>
			<Label className='text-sm font-medium'>Email</Label>
			<div className='flex items-center justify-between rounded-md border px-3 py-2'>
				<span className='text-sm select-none'>{email.email}</span>
				<Button
					variant='outline'
					size='sm'
				>
					<Pencil size={22} />
				</Button>
			</div>
		</div>
	)
}
