import { ProfilePage } from './ProfilePage'
import { getServerProfile } from '@/services'

export default async function Page() {
	try {
		const profile = await getServerProfile()
		return <ProfilePage profile={profile} />
	} catch (error) {
		return (
			<ProfilePage
				profile={null}
				error={error as Error}
			/>
		)
	}
}
