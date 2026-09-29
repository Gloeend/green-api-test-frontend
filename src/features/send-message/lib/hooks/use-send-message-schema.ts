import { GREEN_API_CONFIG } from '@shared/config/green-api-config'
import { z } from 'zod'

export const useSendMessageSchema = () => {
	return z.object({
		text: z
			.string()
			.trim()
			.min(1, { message: 'Введите сообщение' })
			.max(GREEN_API_CONFIG.MESSAGE_MAX_LENGTH, {
				message: `Максимальная длина сообщения - ${GREEN_API_CONFIG.MESSAGE_MAX_LENGTH} символов`
			})
	})
}

export type SendMessageSchema = z.infer<ReturnType<typeof useSendMessageSchema>>
