'use client'

import { ChevronLeft, Loader2, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'

import { Button } from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { cn } from '@/utils/cn.util'

export function ProfileCard() {
	const { data, isPending } = useProfile()

	const pathName = usePathname()
	const router = useRouter()

	const matcher = match([
		Pages.ACCOUNT,
		Pages.PROFILE,
		Pages.PROFILE_APPEARANCE,
		Pages.PROFILE_NOTIFICATIONS,
		Pages.PROFILE_SECURITY,
		Pages.PROFILE_ADVANCED
	])
	const isActive = pathName ? !!matcher(pathName) : false

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

	if (isActive)
		return (
			<Button
				variant='ghost'
				className='w-max'
				size='sm'
				onClick={() => router.push(Pages.DASHBOARD)}
			>
				<ChevronLeft />
				<span>Back to app</span>
			</Button>
		)

	return (
		<Link
			href={Pages.PROFILE}
			className={cn(
				'text-foreground border-secondary hover:bg-background/50 group base-round hover:border-secondary/60 mb-3 flex cursor-pointer items-center justify-between border px-3 py-1.5 transition-colors duration-150',
				{
					'bg-background pointer-events-none border-none': isActive
				}
			)}
		>
			<div className='flex items-center gap-2'>
				{data.avatar_path ? (
					<Image
						src={data.avatar_path || '/images/default-avatar.png'}
						alt={`${data.name} || ''`}
						width={30}
						height={30}
						className='rounded-full'
					/>
				) : (
					<div
						className='size-9 rounded-full bg-blue-500'
						aria-hidden='true'
					/>
				)}
				<p className='font-bold'>{data.name}</p>
			</div>
			<Settings
				size={20}
				className={cn('opacity-80', isActive && 'opacity-90')}
			/>
		</Link>
	)
}
