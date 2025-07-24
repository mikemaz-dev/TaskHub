import { useEffect, useRef, useState } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { createClient } from '@/utils/supabase/client'

import type { TChatMessageWithProfile } from '@/types/message/message.interface'

export const useChat = ({ userId }: { userId: string }) => {
	const { data: currentUser, isLoading } = useProfile()

	const supabase = useRef(createClient())
	const [messages, setMessages] = useState<TChatMessageWithProfile[]>([])
	const [text, setText] = useState('')

	useEffect(() => {
		if (isLoading) return

		const getCurrentUser = async () => {
			const { data } = await supabase.current.auth.getUser()
			return data.user?.id
		}

		getCurrentUser().then(userId => {
			if (!userId) return

			supabase.current
				.from('chat_message')
				.select(`*, profile:profile(id, name, avatar_path)`)
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
					async payload => {
						const msg = payload.new as TChatMessageWithProfile
						setMessages(prev => [...prev, msg])
					}
				)
				.subscribe()

			return () => {
				supabase.current.removeChannel(channel)
			}
		})
	}, [isLoading])

	const sendMessage = async () => {
		if (!text.trim()) return

		await supabase.current.from('chat_message').insert({
			text,
			user_id: userId
		})

		setText('')
	}

	return {
		messages,
		setText,
		text,
		currentUser,
		isLoading,
		sendMessage
	}
}
