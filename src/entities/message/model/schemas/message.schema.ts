import { z } from 'zod'

import type { Message } from '../types'

export const messageSchema: z.ZodType<Message> = z.object({
	id: z.string(),
	idMessage: z.string().optional(),
	text: z.string(),
	direction: z.enum(['INCOMING', 'OUTGOING']),
	status: z.enum(['PENDING', 'SENT', 'FAILED']).optional(),
	timestamp: z.number()
})
