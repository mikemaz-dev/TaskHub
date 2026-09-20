'use client'

import type { TProfile } from '@/types/user/profile.types'

export function ProfileIdentityFields({ profile }: { profile: TProfile }) {
	return (
		<div className='th-form-columns'>
			<label>
				Display name
				<input
					name='name'
					required
					minLength={2}
					maxLength={50}
					defaultValue={profile.name ?? ''}
					autoComplete='name'
				/>
			</label>
			<label>
				Username
				<input
					name='nick'
					required
					minLength={3}
					maxLength={20}
					defaultValue={profile.nick ?? ''}
					pattern='[a-zA-Z0-9_]+'
					autoComplete='username'
				/>
			</label>
		</div>
	)
}
