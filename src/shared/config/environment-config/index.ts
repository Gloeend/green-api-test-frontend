import { z } from 'zod'

const validateSchema = z.object({
	VITE_GREEN_API_URL: z.url()
})

export const ENV_CONFIG = validateSchema.parse(import.meta.env)
