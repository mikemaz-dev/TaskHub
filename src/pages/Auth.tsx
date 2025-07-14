'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { AuthForm } from '@/components/sections/auth-form/AuthForm'
import { Heading, SkeletonLoader } from '@/components/ui'
import { Logo } from '@/components/ui/Logo'
import { AuroraBackground } from '@/components/ui/background/aurora-background'

import { SITE_NAME } from '@/constants/constants'

import type { IAuth } from '@/types/auth/auth.types'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Auth({ type }: IAuth) {
	return (
		<AuroraBackground className='h-screen w-screen'>
			<div className='bg-card/80 text-foreground relative flex min-w-sm flex-col gap-7 rounded-2xl p-6 shadow-sm backdrop-blur-md'>
				<div className='flex items-center justify-between'>
					<Logo />
					<DynamicThemeToggle />
				</div>
				<AuthForm type={type} />
			</div>
		</AuroraBackground>
	)
}
