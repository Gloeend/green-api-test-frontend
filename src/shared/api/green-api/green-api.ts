import { greenApiRequest } from './green-api-request'
import {
	checkAccountResponseSchema,
	deleteNotificationResponseSchema,
	getSettingsResponseSchema,
	getStateInstanceResponseSchema,
	receiveNotificationResponseSchema,
	sendMessageResponseSchema,
	setSettingsResponseSchema
} from './schemas'
import type {
	CheckAccountBodyDTO,
	CheckAccountResponseDTO,
	DeleteNotificationResponseDTO,
	GetSettingsResponseDTO,
	GetStateInstanceResponseDTO,
	GreenApiCredentials,
	ReceiveNotificationResponseDTO,
	SendMessageBodyDTO,
	SendMessageResponseDTO,
	SetSettingsBodyDTO,
	SetSettingsResponseDTO
} from './types'

export const greenApi = {
	getStateInstance: (credentials: GreenApiCredentials): Promise<GetStateInstanceResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'getStateInstance',
			schema: getStateInstanceResponseSchema
		})
	},
	getSettings: (credentials: GreenApiCredentials, signal?: AbortSignal): Promise<GetSettingsResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'getSettings',
			schema: getSettingsResponseSchema,
			signal
		})
	},
	setSettings: (credentials: GreenApiCredentials, dto: SetSettingsBodyDTO): Promise<SetSettingsResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'setSettings',
			httpMethod: 'POST',
			body: dto,
			schema: setSettingsResponseSchema
		})
	},
	checkAccount: (credentials: GreenApiCredentials, dto: CheckAccountBodyDTO): Promise<CheckAccountResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'checkAccount',
			httpMethod: 'POST',
			body: dto,
			schema: checkAccountResponseSchema
		})
	},
	sendMessage: (credentials: GreenApiCredentials, dto: SendMessageBodyDTO): Promise<SendMessageResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'sendMessage',
			httpMethod: 'POST',
			body: dto,
			schema: sendMessageResponseSchema
		})
	},
	receiveNotification: (
		credentials: GreenApiCredentials,
		receiveTimeout: number,
		signal: AbortSignal
	): Promise<ReceiveNotificationResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'receiveNotification',
			searchParams: { receiveTimeout },
			schema: receiveNotificationResponseSchema,
			signal
		})
	},
	deleteNotification: (
		credentials: GreenApiCredentials,
		receiptId: number,
		signal: AbortSignal
	): Promise<DeleteNotificationResponseDTO> => {
		return greenApiRequest(credentials, {
			method: 'deleteNotification',
			httpMethod: 'DELETE',
			pathParam: receiptId,
			schema: deleteNotificationResponseSchema,
			signal
		})
	}
}
