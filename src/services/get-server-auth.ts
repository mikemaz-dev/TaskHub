import { redirect } from 'next/navigation'

import { Pages } from '@/config/public-page.config'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerAuth(isNeedRedirect = false) {
	const supabase = await createClientFromServer()
	const { data, error } = await supabase.auth.getUser()

	if (error || !data?.user) {
		return isNeedRedirect ? redirect(Pages.LOGIN) : null
	}

	return data.user
}
