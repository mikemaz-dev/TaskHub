import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

export const useGetTasks = () => {
	const supabase = createClient()

	return useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			const { data, error } = await supabase.from('tasks').select('*')
			if (error) throw error
			return data
		},
		refetchInterval: 5000,
		staleTime: 1000
	})
}
