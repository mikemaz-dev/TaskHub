import { redirect } from 'next/navigation'

import { Onboarding } from '@/components/workspace/Onboarding'

import { createClientFromServer } from '@/utils/supabase/server'

import { getServerAuth } from '@/services/get-server-auth'

export default async function Page() {
	const user = await getServerAuth(true)
	const client = await createClientFromServer()
	const { data, error } = await client.from('profile').select('*').eq('id', user!.id).maybeSingle()
	if (error) throw new Error('Could not load your profile')
	if (data?.name) redirect('/dashboard')
	return <Onboarding />
}
