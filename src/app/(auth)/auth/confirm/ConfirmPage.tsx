'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Pages } from '@/config/public-page.config'

import { createClient } from '@/utils/supabase/client'

export async function ConfirmPage() {
	const params = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const verifyToken = async () => {
			const token_hash = params && params.get('token_hash')

			console.log(token_hash)

			if (!token_hash) {
				return router.replace(Pages.LOGIN)
			}

			const { error } = await createClient().auth.verifyOtp({
				type: 'email',
				token_hash
			})

			if (error) return router.replace(Pages.LOGIN)

			if (token_hash) router.replace(Pages.DASHBOARD)
		}

		verifyToken()
	}, [])

	return <p>Verifying your email...</p>
}
