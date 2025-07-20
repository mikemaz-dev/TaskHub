import { useState } from 'react'

import { MESSAGES } from '@/data/messages/messages.data'
import { USERS_DATA } from '@/data/users/users.data'
import type { IMessage } from '@/types/message/message.interface'

export const useChat = () => {
	const user = USERS_DATA[0]
	const [messages, setMessages] = useState<IMessage[]>(MESSAGES(user.nick))
	const [message, setMessage] = useState('')
	const [file, setFile] = useState<File | null>(null)

	const handleSend = () => {
		if (message.trim() || file) {
			setMessages([
				...messages,
				{
					id: Date.now(),
					text: message.trim() || 'File send',
					sender: true,
					timestamp: new Date().toLocaleTimeString('en', {
						hour: '2-digit',
						minute: '2-digit'
					}),
					nickname: user.nick
				}
			])
			setMessage('')
			setFile(null)
		}
	}

	return {
		messages,
		message,
		setMessages,
		file,
		setFile,
		handleSend,
		user
	}
}
