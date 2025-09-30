import { Loader2 } from 'lucide-react'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatTop from './ChatTop'
import MsgItem from './MsgItem'
import { useChat } from './useChat'
import type { TChatMessageWithProfile } from '@/types/message/message.interface'

export function Chat({ userId }: { userId: string }) {
	const { messages, currentUser, setText, text, isLoading, sendMessage } = useChat({ userId })

	if (isLoading) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center gap-2 bg-white shadow-sm dark:bg-neutral-800'>
				<Loader2 className='text-primary h-12 w-12 animate-spin' />
				<h2 className='text-2xl font-semibold text-gray-800 dark:text-neutral-100'>
					Loading chat...
				</h2>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-secondary shadow-sm '>
			<div className='from-secondary flex flex-col gap-20 bg-gradient-to-b from-91% to-white p-5 pb-2 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800'>
				<ChatHeader />
				<ChatTop user={currentUser} />
			</div>
			<div className='flex h-full flex-col justify-between p-5'>
				<div className='hide-scrollbar flex max-h-[27.5rem] flex-col gap-3 overflow-y-auto'>
					{messages.map((msg: TChatMessageWithProfile) => (
						<MsgItem
							key={msg.id}
							msg={msg}
							userId={userId}
						/>
					))}
				</div>
				<ChatInput
					text={text}
					setText={setText}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	)
}
