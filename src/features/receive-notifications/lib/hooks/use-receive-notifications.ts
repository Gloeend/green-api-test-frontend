import { chatSliceActions } from '@entities/chat'
import { clearStoredCredentials, getSessionCredentials, sessionSliceActions } from '@entities/session'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { useCallback, useEffect } from 'react'

import { NotificationPollingService } from '../../model/services/notification-polling.service'
import type { IncomingTextMessage } from '../../model/types'

export const useReceiveNotifications = () => {
	const dispatch = useAppDispatch()
	const credentials = useAppSelector(getSessionCredentials)

	const onMessage = useCallback(
		(message: IncomingTextMessage) => {
			dispatch(
				chatSliceActions.receiveMessage({
					chat: { chatId: message.chatId, name: message.senderName, phone: message.senderPhone },
					message: {
						id: message.idMessage,
						idMessage: message.idMessage,
						text: message.text,
						direction: 'INCOMING',
						timestamp: message.timestamp
					}
				})
			)
		},
		[dispatch]
	)

	const onUnauthorized = useCallback(() => {
		clearStoredCredentials()
		dispatch(sessionSliceActions.expire('GREEN-API отклонил учётные данные. Проверьте idInstance и apiTokenInstance'))
		dispatch(chatSliceActions.reset())
	}, [dispatch])

	useEffect(() => {
		if (!credentials) {
			return
		}

		const pollingService = new NotificationPollingService(credentials, onMessage, onUnauthorized)
		pollingService.start()

		return () => {
			pollingService.stop()
		}
	}, [credentials, onMessage, onUnauthorized])
}
