import { getServerProfile } from '@/services'
import { TProfile } from '@/types/user/profile.types'
import { ProfilePage } from './ProfilePage'

export default async function Page() {
	const profile = await getServerProfile()
	return (
		<ProfilePage
			profile={profile ? (profile as TProfile) : null}
			error={undefined}
		/>
	)
}
