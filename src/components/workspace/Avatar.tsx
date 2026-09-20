'use client'

import { useState } from 'react'

import { getAvatarUrl } from '@/utils/getAvatarUrl'

export function Avatar({
	name,
	path,
	large = false
}: {
	name?: string | null
	path?: string | null
	large?: boolean
}) {
	const [failed, setFailed] = useState('')
	const url = path ? getAvatarUrl(path) : ''
	return (
		<span className={`th-avatar ${large ? 'th-avatar-large' : ''}`}>
			{url && failed !== url ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={url} alt={name || 'Profile'} onError={() => setFailed(url)} />
			) : (
				<span>{(name || '?').slice(0, 2).toUpperCase()}</span>
			)}
		</span>
	)
}
