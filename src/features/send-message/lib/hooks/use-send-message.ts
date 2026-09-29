import { chatSliceActions, getChatById } from '@entities/chat'
import type { Message } from '@entities/message'
import { getSessionCredentials } from '@entities/session'
import { greenApi } from '@shared/api/green-api'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { type MouseEvent, useCallback } from 'react'

export const useSendMessage = (chatId: string) => {
	const dispatch = useAppDispatch()
	const credentials = useAppSelector(getSessionCredentials)
	const chat = useAppSelector((store) => getChatById(store, chatId))

	const deliver = useCallback(
		async (message: Message) => {
			if (!credentials) {
				return
			}

			try {
				const { idMessage } = await greenApi.sendMessage(credentials, { chatId, message: message.text })
				dispatch(chatSliceActions.updateMessage({ chatId, id: message.id, changes: { status: 'SENT', idMessage } }))
			} catch {
				dispatch(chatSliceActions.updateMessage({ chatId, id: message.id, changes: { status: 'FAILED' } }))
			}
		},
		[chatId, credentials, dispatch]
	)

	const onSend = useCallback(
		(text: string) => {
			const message: Message = {
				id: crypto.randomUUID(),
				text,
				direction: 'OUTGOING',
				status: 'PENDING',
				timestamp: Date.now()
			}

			dispatch(chatSliceActions.addMessage({ chatId, message }))
			deliver(message).catch(console.error)
		},
		[chatId, deliver, dispatch]
	)

	const onRetry = useCallback(
		(ev: MouseEvent<HTMLButtonElement>) => {
			const foundMessage = chat?.messages.find((needle) => needle.id === ev.currentTarget.dataset.id)

			if (!foundMessage) {
				return
			}

			dispatch(chatSliceActions.updateMessage({ chatId, id: foundMessage.id, changes: { status: 'PENDING' } }))
			deliver(foundMessage).catch(console.error)
		},
		[chat, chatId, deliver, dispatch]
	)

	return {
		onSend,
		onRetry
	}
}
