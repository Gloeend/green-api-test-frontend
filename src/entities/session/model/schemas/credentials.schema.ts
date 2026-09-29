import type { GreenApiCredentials } from '@shared/api/green-api'
import { z } from 'zod'

export const credentialsSchema: z.ZodType<GreenApiCredentials> = z.object({
	apiUrl: z.string().min(1),
	idInstance: z.string().min(1),
	apiTokenInstance: z.string().min(1)
})
