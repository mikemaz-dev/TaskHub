import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

export function useTaskSearch(query: string) {
	const value = query.trim().replace(/[\\%_]/g, '')
	const [debounced, setDebounced] = useState(value)
	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), 250)
		return () => clearTimeout(timer)
	}, [value])
	const result = useQuery({
		queryKey: ['task-search', debounced],
		enabled: !!debounced,
		queryFn: async () => {
			const { data, error } = await createClient()
				.from('task')
				.select('id,title,due_date,project(name)')
				.ilike('title', `%${debounced}%`)
				.order('due_date', { ascending: true })
				.limit(8)
			if (error) throw error
			return data
		}
	})
	const waiting = value !== debounced || result.isFetching
	const results = !value || waiting ? [] : (result.data ?? [])
	const status = !value
		? ''
		: waiting
			? 'Searching your tasks…'
			: result.error
				? 'Search is unavailable. Please retry.'
				: results.length
					? ''
					: 'No tasks match this search.'
	return { results, status }
}
