import { useQuery } from '@tanstack/react-query'

import { getClientProfile } from '@/services/profile/profile-client.service'

export const useProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: getClientProfile
	})
}
