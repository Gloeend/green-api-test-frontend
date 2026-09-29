import { z } from 'zod'

export const getStateInstanceResponseSchema = z.object({
	stateInstance: z.string()
})

export const getSettingsResponseSchema = z.object({
	webhookUrl: z.string().nullish(),
	incomingWebhook: z.string()
})

export const setSettingsResponseSchema = z.object({
	saveSettings: z.boolean()
})

export const checkAccountResponseSchema = z.object({
	exist: z.boolean(),
	chatId: z.string().optional()
})

export const sendMessageResponseSchema = z.object({
	idMessage: z.string()
})

export const receiveNotificationResponseSchema = z
	.object({
		receiptId: z.number(),
		body: z.unknown()
	})
	.nullable()

export const deleteNotificationResponseSchema = z.object({
	result: z.boolean()
})
