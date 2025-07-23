import { Paperclip, Send } from 'lucide-react'

import { ChatHeader } from '@/components/sections/chat/ChatHeader'
import { useChat } from '@/components/sections/chat/useChat'
import { Button, Input } from '@/components/ui'

import { ChatTop } from './ChatTop'
import { MsgItem } from './MsgItem'
import type { Database } from '@/types/db.types'

type TChatMessage = Database['public']['Tables']['chat_message']['Row']

export function Chat() {
	const { messages, data, setMessages, sendMessage } = useChat()

	return (
		<div className='flex flex-col bg-white shadow-sm dark:bg-neutral-800'>
			<div className='from-secondary flex flex-col gap-20 bg-gradient-to-b from-91% to-white p-5 pb-8.5 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800'>
				<ChatHeader />
				<ChatTop user={data} />
			</div>
			<div className='flex h-full flex-col justify-between p-5'>
				<div className='flex flex-col gap-3'>
					{messages.map((msg: TChatMessage) => (
						<MsgItem
							key={msg.id}
							msg={msg.text}
							user={msg.user_id}
						/>
					))}
				</div>
				<div className='flex items-center gap-2'>
					<div className='flex-1 items-center'>
						<div className='flex items-center gap-2'>
							<label
								htmlFor='fileInput'
								className='bg-primary/10 hover:bg-primary/20 flex h-10 cursor-pointer items-center justify-center rounded-lg px-3 transition-colors duration-300'
							>
								<Paperclip className='text-primary size-5' />
							</label>
							<Input
								placeholder='Type message...'
								value={messages}
								onChange={e => setMessages(e.target.value)}
							/>
						</div>
					</div>
					<Button
						size='icon'
						onClick={sendMessage}
					>
						<Send className='size-5 text-neutral-100' />
					</Button>
				</div>
			</div>
		</div>
	)
}
