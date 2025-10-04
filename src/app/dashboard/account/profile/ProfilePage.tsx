'use client'

import { AvatarUpload, ChangeEmail } from '@/components/sections'
import { Button, Field } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'

import { fieldsLeft, fieldsRight } from '@/data/profile/profile-page-inputs.data'
import { TProfile } from '@/types/user/profile.types'
import { useProfile } from './useProfile'

interface Props {
	profile: TProfile | null
	error?: Error
}

export function ProfilePage({ profile, error }: Props) {
	const { isUpdating, handleSubmit } = useProfile()

	if (error) {
		return <div className='p-6 text-red-500'>Failed to load profile: {error.message}</div>
	}

	if (!profile || !profile.email || !profile.name || !profile.nick) {
		return <div>Something went wrong, we don't have profile info</div>
	}

	return (
		<section className='bg-background min-h-screen space-y-8 p-6'>
			<SectionHeading title='Profile' />
			<AvatarUpload profile={profile} />

			<form
				className='grid max-w-6xl grid-cols-2 gap-15'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col gap-6'>
					<ChangeEmail email={{ email: profile.email }} />
					{fieldsLeft.map(field => (
						<Field
							key={field.id}
							{...field}
							defaultValue={profile[field.name as keyof TProfile] as string}
						/>
					))}
				</div>

				<div className='flex flex-col gap-6'>
					{fieldsRight.map(field => (
						<Field
							key={field.id}
							{...field}
							defaultValue={profile[field.name as keyof TProfile] as string}
						/>
					))}
				</div>

				<div className='col-span-2'>
					<Button
						type='submit'
						variant='outline'
						disabled={isUpdating}
					>
						{isUpdating ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</section>
	)
}
