import { chatSliceActions, storeChats } from '@entities/chat'
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import type { RootState } from '@shared/config/store-config'

export const chatStorageListener = createListenerMiddleware()

chatStorageListener.startListening({
	matcher: isAnyOf(
		chatSliceActions.addChat,
		chatSliceActions.addMessage,
		chatSliceActions.updateMessage,
		chatSliceActions.receiveMessage
	),
	effect: (_, listenerApi) => {
		const { session, chat } = listenerApi.getState() as RootState

		if (!session.credentials) {
			return
		}

		storeChats(session.credentials.idInstance, chat.items)
	}
})
