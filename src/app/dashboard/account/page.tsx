import { AccountSettings } from '@/components/workspace/AccountSettings'

import { getServerProfile } from '@/services/profile/profile-server.service'

export const metadata = { title: 'Settings' }
export default async function Page() {
	return <AccountSettings profile={await getServerProfile()} />
}
