import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@shared/config/store-config'

export const getChatItems = (store: RootState) => store.chat.items
export const getChatSelectedChatId = (store: RootState) => store.chat.selectedChatId

export const getChatById = (store: RootState, chatId: string) => {
	return store.chat.items.find((needle) => needle.chatId === chatId)
}

export const getChatSelected = createSelector([getChatItems, getChatSelectedChatId], (items, selectedChatId) => {
	return items.find((needle) => needle.chatId === selectedChatId) ?? null
})

export const getChatSortedItems = createSelector([getChatItems], (items) => {
	return [...items].sort((a, b) => b.updatedAt - a.updatedAt)
})
