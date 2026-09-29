import { normalizePhone } from '@shared/lib'
import { z } from 'zod'

export const useCreateChatSchema = () => {
	return z.object({
		phone: z
			.string()
			.trim()
			.min(1, { message: 'Введите номер телефона' })
			.refine((value) => normalizePhone(value) !== null, { message: 'Введите полный номер с кодом +7 или +375' })
	})
}

export type CreateChatSchema = z.infer<ReturnType<typeof useCreateChatSchema>>
