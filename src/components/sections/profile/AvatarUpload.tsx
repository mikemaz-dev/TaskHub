import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'

import { Button, Label } from '@/components/ui'

import { BaseProfileAvatar } from './BaseProfileAvatar'
import { useAvatarHandler } from './useAvatarHandler'
import { TProfile } from '@/types/user/profile.types'

interface Props {
	profile: TProfile
}

export function AvatarUpload({ profile }: Props) {
	const { uploadMutation, removeMutation, preview } = useAvatarHandler({ profile })

	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) return
		uploadMutation.mutate(file)
	}

	return (
		<div className='mb-8 flex flex-col gap-4'>
			<Label className='text-sm font-medium'>Profile picture</Label>
			<div className='flex items-center gap-6'>
				{profile.avatar_path ? (
					<Image
						src={preview}
						alt='Avatar preview'
						width={80}
						height={80}
						className='rounded-xl object-cover shadow-sm'
						unoptimized
					/>
				) : (
					<BaseProfileAvatar profile={{ name: profile.name }} />
				)}

				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							className='hidden'
							onChange={handleFileChange}
						/>
						<Button
							variant='outline'
							size='sm'
							type='button'
							onClick={() => fileInputRef.current?.click()}
							disabled={uploadMutation.isPending}
						>
							{uploadMutation.isPending ? 'Uploading...' : 'Upload picture'}
						</Button>
						{profile.avatar_path && (
							<Button
								variant='destructive'
								size='sm'
								onClick={() => removeMutation.mutate()}
								disabled={uploadMutation.isPending || removeMutation.isPending}
							>
								Remove Picture
							</Button>
						)}
					</div>
					<p className='text-muted-foreground text-sm'>Supported formats: JPG, PNG, SVG, GIF</p>
				</div>
			</div>
		</div>
	)
}
