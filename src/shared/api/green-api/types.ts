import type { z } from 'zod'

import type {
	checkAccountResponseSchema,
	deleteNotificationResponseSchema,
	getSettingsResponseSchema,
	getStateInstanceResponseSchema,
	receiveNotificationResponseSchema,
	sendMessageResponseSchema,
	setSettingsResponseSchema
} from './schemas'

export type GreenApiCredentials = {
	apiUrl: string
	idInstance: string
	apiTokenInstance: string
}

export type GreenApiErrorStatusEnum = number | 'NETWORK_ERROR' | 'INVALID_RESPONSE'

export type GetStateInstanceResponseDTO = z.infer<typeof getStateInstanceResponseSchema>

export type GetSettingsResponseDTO = z.infer<typeof getSettingsResponseSchema>

export type SetSettingsBodyDTO = {
	webhookUrl: string
	incomingWebhook: 'yes' | 'no'
}

export type SetSettingsResponseDTO = z.infer<typeof setSettingsResponseSchema>

export type CheckAccountBodyDTO = {
	phoneNumber: number
}

export type CheckAccountResponseDTO = z.infer<typeof checkAccountResponseSchema>

export type SendMessageBodyDTO = {
	chatId: string
	message: string
}

export type SendMessageResponseDTO = z.infer<typeof sendMessageResponseSchema>

export type ReceiveNotificationResponseDTO = z.infer<typeof receiveNotificationResponseSchema>

export type DeleteNotificationResponseDTO = z.infer<typeof deleteNotificationResponseSchema>
