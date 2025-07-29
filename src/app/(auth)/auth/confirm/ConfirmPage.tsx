'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Pages } from '@/config/public-page.config'

import { createClient } from '@/utils/supabase/client'

export function ConfirmPage() {
	const params = useSearchParams()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const verifyToken = async () => {
			const token_hash = params && params.get('token_hash')

			if (!token_hash) {
				return router.replace(Pages.LOGIN)
			}

			try {
				setIsLoading(true)
				const { error } = await createClient().auth.verifyOtp({
					type: 'email',
					token_hash
				})

				if (error) {
					return router.replace(Pages.LOGIN)
				}

				await new Promise(resolve => setTimeout(resolve, 2000))
				router.replace(Pages.DASHBOARD)
			} finally {
				setIsLoading(false)
			}
		}

		verifyToken()
	}, [router, params])

	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600'>
			<div className='w-full max-w-md space-y-6 rounded-lg bg-white/90 p-8 shadow-xl'>
				<div className='flex flex-col items-center space-y-4'>
					{isLoading ? (
						<>
							<Loader2 className='text-primary h-12 w-12 animate-spin' />
							<h2 className='text-2xl font-bold text-gray-800'>Verifying your email...</h2>
							<p className='text-center text-gray-600'>
								We are checking your email address.
								<br />
								This may take a few seconds.
							</p>
						</>
					) : (
						<>
							<CheckCircle2 className='h-12 w-12 text-green-500' />
							<h2 className='text-2xl font-bold text-gray-800'>Email verified!</h2>
							<p className='text-center text-gray-600'>You will be redirected to the dashboard.</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
