'use client'

import { ChevronLeft, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'

import { BaseProfileAvatar } from '@/components/sections/profile/BaseProfileAvatar'
import { Button } from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import { cn } from '@/utils/cn.util'
import { getAvatarUrl } from '@/utils/getAvatarUrl'

import { TProfile } from '@/types/user/profile.types'

export function ProfileCard({ profile }: { profile: TProfile }) {
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
				'text-foreground border-secondary hover:bg-background/50 group base-round hover:border-secondary/60 flex cursor-pointer items-center justify-between border px-3 py-1.5 transition-colors duration-150',
				{
					'bg-background pointer-events-none border-none': isActive
				}
			)}
		>
			<div className='flex items-center gap-2'>
				{profile.avatar_path ? (
					<Image
						src={getAvatarUrl(profile.avatar_path)}
						alt={profile.name || ''}
						width={30}
						height={30}
						className='rounded-full'
						unoptimized
					/>
				) : (
					<BaseProfileAvatar profile={{ name: profile.name }} isSidebar />
				)}
				<p className='font-bold'>{profile.name}</p>
			</div>
			<Settings
				size={20}
				className={cn('opacity-80', isActive && 'opacity-90')}
			/>
		</Link>
	)
}
