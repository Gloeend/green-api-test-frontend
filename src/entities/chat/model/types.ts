import type { Message } from '@entities/message'

export type Chat = {
	chatId: string
	name: string
	phone: string
	updatedAt: number
	messages: Message[]
}

export type ChatInfo = Pick<Chat, 'chatId' | 'name' | 'phone'>
