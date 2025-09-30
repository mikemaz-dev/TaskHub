'use client'

import { useQuery } from '@tanstack/react-query'

import { getClientProjects } from '@/services/projects/projects-client.service'

export function useProjects() {
	const { data, error } = useQuery({
		queryKey: ['projects'],
		queryFn: () => getClientProjects(),
		select: data =>
			data.map(project => ({
				value: project.id,
				label: project.name
			})),
		staleTime: 1000 * 60 * 5
	})

	return { data, error }
}
