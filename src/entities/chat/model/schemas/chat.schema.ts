import { messageSchema } from '@entities/message'
import { z } from 'zod'

import type { Chat } from '../types'

const chatSchema: z.ZodType<Chat> = z.object({
	chatId: z.string(),
	name: z.string(),
	phone: z.string(),
	updatedAt: z.number(),
	messages: z.array(messageSchema)
})

export const chatListSchema = z.array(chatSchema)
