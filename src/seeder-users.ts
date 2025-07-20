'use server'

import { createAdminClient } from '@/utils/supabase/client'

import { USERS_DATA } from '@/data/users/users.data'

export async function seedAuthUsers() {
	const supabase = createAdminClient()

	// const users = await supabase.auth.admin.listUsers()
	//
	// console.log('Existing users: ', users)
	//
	// for (const user of users.data.users) {
	// 	await supabase.auth.admin.deleteUser(user.id)
	// }

	for (const user of USERS_DATA) {
		const { data } = await supabase.auth.admin.createUser({
			id: user.id,
			email: user.email,
			password: '123456'
		})
		console.log('Seeded users: ', data?.user?.id)
	}
}
