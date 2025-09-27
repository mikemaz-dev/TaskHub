'use client'

import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function AvatarUpload({ image }: { image: string }) {
	const [preview, setPreview] = useState<string>('/images/default-avatar.png')

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => setPreview(reader.result as string)
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='flex w-max items-center gap-4'>
			<Image
				src={image}
				alt='Avatar preview'
				width={96}
				height={96}
				className='h-24 w-24 rounded-xl object-cover shadow-sm'
			/>

			<label
				htmlFor='avatar'
				className='group border-border/60 hover:border-border hover:bg-muted/40 flex cursor-pointer items-center gap-4 rounded-lg border border-dashed px-6 py-4 transition-colors'
			>
				<Upload
					size={25}
					className='opacity-70 transition-opacity group-hover:opacity-100'
				/>
				<div className='flex flex-col'>
					<span className='opacity-80'>Drag and drop or select a file</span>
					<span className='opacity-50'>Supported formats: JPG, PNG, SVG, GIF</span>
				</div>
				<input
					id='avatar'
					type='file'
					accept='.jpg,.png,.svg,.gif'
					className='sr-only'
					onChange={handleFileChange}
				/>
			</label>
		</div>
	)
}
