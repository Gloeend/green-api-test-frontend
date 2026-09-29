import type { z } from 'zod'

type StorageTypeEnum = 'LOCAL' | 'SESSION'

const getStorage = (type: StorageTypeEnum) => {
	return type === 'LOCAL' ? window.localStorage : window.sessionStorage
}

export const readStorage = <T>(type: StorageTypeEnum, key: string, schema: z.ZodType<T>) => {
	try {
		const raw = getStorage(type).getItem(key)

		if (raw === null) {
			return null
		}

		const parsed = schema.safeParse(JSON.parse(raw))

		return parsed.success ? parsed.data : null
	} catch {
		return null
	}
}

export const writeStorage = (type: StorageTypeEnum, key: string, value: unknown) => {
	try {
		getStorage(type).setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error(error)
	}
}

export const removeStorage = (type: StorageTypeEnum, key: string) => {
	try {
		getStorage(type).removeItem(key)
	} catch (error) {
		console.error(error)
	}
}
