import { z } from 'zod'

const senderDataSchema = z.object({
	chatId: z.string(),
	chatName: z.string().optional(),
	chatType: z.string().optional(),
	senderName: z.string().optional(),
	senderPhoneNumber: z.number().optional()
})

const messageDataSchema = z.discriminatedUnion('typeMessage', [
	z.object({
		typeMessage: z.literal('textMessage'),
		textMessageData: z.object({ textMessage: z.string() })
	}),
	z.object({
		typeMessage: z.literal('extendedTextMessage'),
		extendedTextMessageData: z.object({ text: z.string() })
	})
])

export const incomingTextNotificationSchema = z.object({
	typeWebhook: z.literal('incomingMessageReceived'),
	timestamp: z.number(),
	idMessage: z.string(),
	senderData: senderDataSchema,
	messageData: messageDataSchema
})
