import { redirect } from 'next/navigation'

import { Pages } from '@/config/public-page.config'

import { createClient } from '@/utils/supabase/server'

export async function getServerAuth(isNeedRedirect = false) {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.getUser()

	if (error || !data?.user) {
		return isNeedRedirect ? redirect(Pages.LOGIN) : null
	}

	return data.user
}
