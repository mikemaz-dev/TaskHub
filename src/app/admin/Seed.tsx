'use client'

import { Button } from '@/components/ui'

import { seedAuthUsers } from '@/seeder-users'

export function Seed() {
	return (
		<div className='p-10'>
			<Button onClick={seedAuthUsers}>Seed users</Button>
		</div>
	)
}
