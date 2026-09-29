import { incomingTextNotificationSchema } from '../../model/schemas/notification.schema'
import type { IncomingTextMessage } from '../../model/types'

export const parseNotification = (body: unknown): IncomingTextMessage | null => {
	const parsed = incomingTextNotificationSchema.safeParse(body)

	if (!parsed.success) {
		return null
	}

	const { timestamp, idMessage, senderData, messageData } = parsed.data

	if (senderData.chatType === 'group') {
		return null
	}

	return {
		chatId: senderData.chatId,
		senderName: senderData.senderName || senderData.chatName || '',
		senderPhone: senderData.senderPhoneNumber ? String(senderData.senderPhoneNumber) : '',
		idMessage,
		text:
			messageData.typeMessage === 'textMessage'
				? messageData.textMessageData.textMessage
				: messageData.extendedTextMessageData.text,
		timestamp: timestamp * 1000
	}
}
