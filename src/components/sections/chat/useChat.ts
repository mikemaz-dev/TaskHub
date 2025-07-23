import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import { getProfile } from '@/services/profile/profile-client.service'
import type { Database } from '@/types/db.types'

type TChatMessage = Database['public']['Tables']['chat_message']['Row']

export const useChat = () => {
	const { data } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile
	})
	const supabase = useRef(createClient())

	const [messages, setMessages] = useState([])
	const [text, setText] = useState('')

	useEffect(() => {
		supabase.current
			.from('chat_message')
			.select('*')
			.order('created_at', { ascending: true })
			.then(({ data }) => {
				if (!data) return
				setMessages(data)
			})

		const channel = supabase.current
			.channel('chat_message')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'chat_message'
				},
				payload => {
					const msg = payload.new as TChatMessage
					setMessages(prev => [...prev, msg])
				}
			)
			.subscribe()

		return () => {
			supabase.current.removeChannel(channel)
		}
	}, [])

	const sendMessage = async () => {
		if (!text.trim()) return

		await supabase.current.auth.getUser().then(({ data }) => {
			if (!data.user) return

			const userId = data.user.id

			return supabase.current.from('chat_message').insert({
				text,
				user_id: userId
			})
		})

		setText('')
	}

	return {
		messages,
		setMessages,
		data,
		sendMessage
	}
}
