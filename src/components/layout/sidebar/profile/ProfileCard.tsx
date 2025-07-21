import { ChevronDown, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import { PROFILE } from '@/data/sidebar/profile.data'
import type { IUser } from '@/types/user/user.types'

export function ProfileCard() {
	const supabase = createClient()

	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const {
					data: { user },
					error
				} = await supabase.auth.getUser()

				if (error) {
					throw error
				}

				setUser(user)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error has occurred')
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	if (error) {
		return <div className='border-destructive text-destructive rounded-lg border p-4'>{error}</div>
	}

	if (loading) {
		return (
			<div className='bg-background flex items-center gap-2 rounded-3xl px-4 py-2.5'>
				<Loader2 className='text-primary size-9 animate-spin' />
				<span className='text-foreground text-lg font-bold'>Loading...</span>
			</div>
		)
	}

	return (
		<div className='bg-background flex items-center justify-center gap-1 rounded-3xl px-4 py-1.5'>
			<div className='flex items-center gap-2'>
				{PROFILE.avatar ? (
					<img
						src={PROFILE.avatar}
						alt='avatar'
						className='h-9 w-9 rounded-full'
					/>
				) : (
					<div className='size-9 rounded-full bg-blue-500' />
				)}
				<div className='flex flex-col'>
					<p className='font-bold'>Mike</p>
					<p className='max-w-[150px] truncate text-sm font-medium opacity-60'>{user.email}</p>
				</div>
			</div>
			<button
				className='cursor-pointer transition-opacity duration-300 hover:opacity-100'
				aria-label='Открыть профиль'
			>
				<ChevronDown
					size={20}
					className='text-foreground opacity-60'
				/>
			</button>
		</div>
	)
}
