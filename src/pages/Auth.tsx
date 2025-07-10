'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Heading, SkeletonLoader } from '@/components/ui'
import { AuthForm } from '@/components/ui/auth-form/AuthForm'
import { AuroraBackground } from '@/components/ui/background/aurora-background'

import { SITE_NAME } from '@/constants/constants'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Auth() {
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
				<AuthForm />
			</div>
		</AuroraBackground>
	)
}
