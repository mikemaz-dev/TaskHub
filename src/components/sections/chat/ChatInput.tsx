import { Paperclip, Send } from 'lucide-react'
import { type Dispatch, type SetStateAction, memo } from 'react'

import { Button, Input } from '@/components/ui'

interface Props {
	text: string
	setText: Dispatch<SetStateAction<string>>
	sendMessage: () => void
}

function ChatInput({ text, sendMessage, setText }: Props) {
	return (
		<div className='mt-2 flex items-center gap-2'>
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
						value={text}
						aria-label='Enter your message to send to chat'
						onChange={e => setText(e.target.value)}
					/>
				</div>
			</div>
			<Button
				size='icon'
				onClick={sendMessage}
				aria-label={`Send message with ${text} text`}
			>
				<Send className='size-5 text-neutral-100' />
			</Button>
		</div>
	)
}

export default memo(ChatInput)
