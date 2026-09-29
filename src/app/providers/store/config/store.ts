import { chatSliceActions, chatSliceReducer, readStoredChats } from '@entities/chat'
import { readStoredCredentials, sessionSliceActions, sessionSliceReducer } from '@entities/session'
import { configureStore } from '@reduxjs/toolkit'

import { chatStorageListener } from './chat-storage-listener'

export const store = configureStore({
	reducer: {
		session: sessionSliceReducer,
		chat: chatSliceReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(chatStorageListener.middleware),
	devTools: import.meta.env.DEV
})

const storedCredentials = readStoredCredentials()

if (storedCredentials) {
	store.dispatch(sessionSliceActions.login(storedCredentials))
	store.dispatch(chatSliceActions.setItems(readStoredChats(storedCredentials.idInstance)))
}
