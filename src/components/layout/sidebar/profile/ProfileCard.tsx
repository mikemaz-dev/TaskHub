import { ChevronDown, Loader2 } from 'lucide-react'
import Image from 'next/image'

import { useProfile } from '@/hooks/useProfile'

export function ProfileCard() {
	const { data, isPending } = useProfile()

	if (isPending) {
		return (
			<div className='bg-background flex items-center gap-2 rounded-3xl px-4 py-2.5'>
				<Loader2 className='text-primary size-9 animate-spin' />
				<span className='text-foreground text-lg font-bold'>Loading...</span>
			</div>
		)
	}

	if (!data) {
		return (
			<div className='border-destructive text-destructive rounded-lg border p-4'>
				There are no data yet.
			</div>
		)
	}

	return (
		<div className='bg-background flex items-center gap-2 rounded-2xl px-4 py-1.5'>
			{data.avatar_path ? (
				<Image
					src={data.avatar_path || '/images/default-avatar.png'}
					alt='avatar'
					width={36}
					height={36}
					className='rounded-full'
				/>
			) : (
				<div className='size-9 rounded-full bg-blue-500' />
			)}
			<div className='flex flex-col'>
				<p className='font-bold'>{data.name}</p>
				<p className='max-w-[150px] truncate text-sm font-medium opacity-60'>{data.email}</p>
			</div>
		</div>
	)
}
