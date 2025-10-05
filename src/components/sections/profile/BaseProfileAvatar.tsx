import { TProfile } from '@/types/user/profile.types'
import { cn } from '@/utils'

export function BaseProfileAvatar({
	profile,
	isSidebar
}: {
	profile: Pick<TProfile, 'name'>
	isSidebar?: boolean
}) {
	return (
		<div
			className={cn(
				'bg-secondary flex size-16 items-center justify-center rounded-full text-3xl font-bold text-white shadow-inner shadow-white select-none',
				isSidebar && 'size-8 text-base'
			)}
			aria-hidden='true'
		>
			{profile.name?.[0] ?? '?'}
		</div>
	)
}
