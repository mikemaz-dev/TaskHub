'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import { AuthForm } from '@/components/sections/auth-form/AuthForm'
import { Heading, SkeletonLoader } from '@/components/ui'
import { AuroraBackground } from '@/components/ui/background/aurora-background'

import { SITE_NAME } from '@/constants/constants'

import { Pages } from '@/config/public-page.config'

import { useAuthStore } from '@/store/auth.store'

import type { IAuth } from '@/types/auth/auth.types'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Auth({ type }: IAuth) {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)

	return (
		<AuroraBackground className='h-screen w-screen'>
			<div className='bg-card/80 text-foreground relative flex min-w-sm flex-col gap-7 rounded-2xl p-6 shadow-sm backdrop-blur-md'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Image
							src='/images/favicon.svg'
							alt='Logo'
							width={38}
							height={38}
						/>
						<Heading>{SITE_NAME}</Heading>
					</div>
					<DynamicThemeToggle />
				</div>
				<AuthForm type={type} />
			</div>
		</AuroraBackground>
	)
}
