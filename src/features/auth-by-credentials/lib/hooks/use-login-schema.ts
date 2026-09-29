import { z } from 'zod'

export const useLoginSchema = () => {
	return z.object({
		idInstance: z
			.string()
			.trim()
			.min(1, { message: 'Заполните поле' })
			.regex(/^\d+$/, { message: 'idInstance состоит только из цифр' }),
		apiTokenInstance: z.string().trim().min(1, { message: 'Заполните поле' }),
		apiUrl: z
			.string()
			.trim()
			.pipe(z.url({ protocol: /^https?$/, message: 'Введите адрес вида https://api.green-api.com' })),
		isRemembered: z.boolean()
	})
}

export type LoginSchema = z.infer<ReturnType<typeof useLoginSchema>>
