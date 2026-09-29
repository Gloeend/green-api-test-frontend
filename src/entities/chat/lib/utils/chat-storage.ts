import { readStorage, writeStorage } from '@shared/lib'

import { StorageKeys } from '../../model/consts'
import { chatListSchema } from '../../model/schemas/chat.schema'
import type { Chat } from '../../model/types'

const getStorageKey = (idInstance: string) => `${StorageKeys.CHATS}:${idInstance}`

export const readStoredChats = (idInstance: string): Chat[] => {
	const chats = readStorage('LOCAL', getStorageKey(idInstance), chatListSchema) ?? []

	return chats.map((chat) => ({
		...chat,
		messages: chat.messages.map((message) =>
			message.status === 'PENDING' ? { ...message, status: 'FAILED' as const } : message
		)
	}))
}

export const storeChats = (idInstance: string, chats: Chat[]) => {
	writeStorage('LOCAL', getStorageKey(idInstance), chats)
}
