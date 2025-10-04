import Image from 'next/image'

import { Button, Label } from '@/components/ui'

import { TProfile } from '@/types/user/profile.types'

interface Props {
	profile: TProfile
}

export function AvatarUpload({ profile }: Props) {
	return (
		<div className='mb-8 flex flex-col gap-4'>
			<Label className='text-sm font-medium'>Profile picture</Label>
			<div className='flex items-start gap-6'>
				<Image
					src={profile.avatar_path ?? './images/default-avatar.png'}
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
	)
}
