'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useProfile } from './useProfile'
import { TProfile } from '@/types/user/profile.types'

interface Props {
	profile: TProfile | null
	error?: Error
}

export function ProfilePage({ profile, error }: Props) {
	console.log(profile)

	const { updateProfile, isUpdating, refetch } = useProfile()

	if (error) {
		return <div className='p-6 text-red-500'>Failed to load profile: {error.message}</div>
	}

	if (
		!profile ||
		!profile.profession ||
		!profile.email ||
		!profile.name ||
		!profile.description ||
		!profile.avatar_path ||
		!profile.nick
	)
		return <div>Something went wrong, we don't have profile info</div>

	return (
		<section className='bg-background min-h-screen space-y-8 p-6'>
			<SectionHeading title='Profile' />

			<div className='mb-8 flex flex-col gap-4'>
				<Label className='text-sm font-medium'>Profile picture</Label>
				<div className='flex items-start gap-6'>
					<Image
						src={profile.avatar_path}
						alt='Avatar preview'
						width={80}
						height={80}
						className='rounded-xl object-cover shadow-sm'
					/>
					<div className='flex flex-col gap-2'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='sm'
							>
								Change Picture
							</Button>
							<Button
								variant='destructive'
								size='sm'
							>
								Remove Picture
							</Button>
						</div>
						<p className='text-muted-foreground text-sm'>Supported formats: JPG, PNG, SVG, GIF</p>
					</div>
				</div>
			</div>

			<form
				className='grid max-w-6xl grid-cols-2 gap-15'
				onSubmit={e => {
					e.preventDefault()

					const formData = new FormData(e.currentTarget)

					updateProfile(
						{
							name: formData.get('name') as string,
							nick: formData.get('nick') as string,
							profession: formData.get('profession') as string,
							description: formData.get('bio') as string
						},
						{
							onSuccess: () => {
								refetch()
							}
						}
					)
				}}
			>
				<div className='flex flex-col gap-6'>
					<div className='space-y-1'>
						<Label className='text-sm font-medium'>Email</Label>
						<div className='flex items-center justify-between rounded-md border px-3 py-2'>
							<span className='text-sm select-none'>{profile.email}</span>
							<Button
								variant='outline'
								size='sm'
							>
								<Pencil size={22} />
							</Button>
						</div>
					</div>

					<div className='flex flex-col gap-1'>
						<Label
							htmlFor='name'
							className='text-sm font-medium'
						>
							Full name
						</Label>
						<Input
							id='name'
							name='name'
							defaultValue={profile.name}
							placeholder='John Doe'
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<Label
							htmlFor='username'
							className='text-sm font-medium'
						>
							Username
						</Label>
						<Input
							id='username'
							name='nick'
							defaultValue={profile.nick}
							placeholder='@johndoe'
						/>
					</div>

					<div className='flex flex-col gap-6'>
						<div className='flex flex-col gap-1'>
							<Label
								htmlFor='profession'
								className='text-sm font-medium'
							>
								Profession
							</Label>
							<Input
								id='profession'
								name='profession'
								defaultValue={profile.profession}
								placeholder='Frontend Developer'
							/>
						</div>

						<div className='flex flex-col gap-1'>
							<Label
								htmlFor='bio'
								className='text-sm font-medium'
							>
								Additional information
							</Label>
							<Textarea
								id='bio'
								name='description'
								defaultValue={profile.description}
								placeholder='Tell us a bit about yourself...'
								className='min-h-[135px] resize-y'
							/>
						</div>
					</div>
					<Button
						type='submit'
						variant='outline'
						className='mt-2 self-start'
						disabled={isUpdating}
					>
						{isUpdating ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</section>
	)
}
