import type { IMessage } from '@/types/message/message.interface'

export const MESSAGES = (userNick: string): IMessage[] => [
	{
		id: 1,
		text: "Morning! I've been working on the design elements",
		sender: true,
		timestamp: '10:05',
		nickname: userNick
	},
	{
		id: 2,
		text: "Looking great! What's the status on the dashboard?",
		sender: false,
		timestamp: '10:07',
		nickname: userNick
	},
	{
		id: 3,
		text: 'Almost done! Just need to fix the animations',
		sender: true,
		timestamp: '10:08',
		nickname: userNick
	}
]
