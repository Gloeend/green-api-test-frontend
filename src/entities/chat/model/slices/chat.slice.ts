import type { Message } from '@entities/message'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Chat, ChatInfo } from '../types'

type InitialState = {
	items: Chat[]
	selectedChatId: string | null
}

const INITIAL_STATE: InitialState = {
	items: [],
	selectedChatId: null
}

const findChat = (state: InitialState, chatId: string) => {
	return state.items.find((needle) => needle.chatId === chatId)
}

const appendMessage = (chat: Chat, message: Message) => {
	const isDuplicate =
		message.idMessage !== undefined && chat.messages.some((needle) => needle.idMessage === message.idMessage)

	if (isDuplicate) {
		return
	}

	chat.messages.push(message)
	chat.updatedAt = Math.max(chat.updatedAt, message.timestamp)
}

const chatSlice = createSlice({
	name: 'chat',
	initialState: INITIAL_STATE,
	reducers: {
		setItems: (state, { payload }: PayloadAction<Chat[]>) => {
			state.items = payload
		},
		addChat: (state, { payload }: PayloadAction<ChatInfo & Pick<Chat, 'updatedAt'>>) => {
			if (findChat(state, payload.chatId)) {
				return
			}

			state.items.push({ ...payload, messages: [] })
		},
		selectChat: (state, { payload }: PayloadAction<string | null>) => {
			state.selectedChatId = payload
		},
		addMessage: (state, { payload }: PayloadAction<{ chatId: string; message: Message }>) => {
			const chat = findChat(state, payload.chatId)

			if (!chat) {
				return
			}

			appendMessage(chat, payload.message)
		},
		updateMessage: (
			state,
			{ payload }: PayloadAction<{ chatId: string; id: string; changes: Partial<Pick<Message, 'status' | 'idMessage'>> }>
		) => {
			const message = findChat(state, payload.chatId)?.messages.find((needle) => needle.id === payload.id)

			if (!message) {
				return
			}

			Object.assign(message, payload.changes)
		},
		receiveMessage: (state, { payload }: PayloadAction<{ chat: ChatInfo; message: Message }>) => {
			const foundChat = findChat(state, payload.chat.chatId)

			if (!foundChat) {
				state.items.push({ ...payload.chat, updatedAt: payload.message.timestamp, messages: [payload.message] })
				return
			}

			foundChat.name ||= payload.chat.name
			foundChat.phone ||= payload.chat.phone
			appendMessage(foundChat, payload.message)
		},
		reset: () => INITIAL_STATE
	}
})

export const chatSliceActions = chatSlice.actions
export const chatSliceReducer = chatSlice.reducer
