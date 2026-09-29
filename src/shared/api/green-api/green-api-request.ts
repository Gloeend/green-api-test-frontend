import { GREEN_API_CONFIG } from '@shared/config/green-api-config'
import axios, { isAxiosError } from 'axios'
import type { z } from 'zod'

import { GreenApiError } from './green-api-error'
import type { GreenApiCredentials } from './types'

type GreenApiRequestOptions<T> = {
	method: string
	schema: z.ZodType<T>
	httpMethod?: 'GET' | 'POST' | 'DELETE'
	body?: unknown
	pathParam?: string | number
	searchParams?: Record<string, string | number>
	signal?: AbortSignal
}

const httpClient = axios.create({
	timeout: GREEN_API_CONFIG.REQUEST_TIMEOUT_MS
})

const buildPath = (
	{ idInstance, apiTokenInstance }: GreenApiCredentials,
	{ method, pathParam }: Pick<GreenApiRequestOptions<unknown>, 'method' | 'pathParam'>
) => {
	return [`waInstance${idInstance}`, method, apiTokenInstance, pathParam].filter((needle) => needle !== undefined).join('/')
}

const toGreenApiError = (error: unknown) => {
	if (isAxiosError(error) && error.response) {
		return new GreenApiError(error.response.status)
	}

	return new GreenApiError('NETWORK_ERROR')
}

export const greenApiRequest = async <T>(credentials: GreenApiCredentials, options: GreenApiRequestOptions<T>) => {
	const { schema, httpMethod = 'GET', body, searchParams, signal } = options

	let data: unknown

	try {
		const response = await httpClient.request<unknown>({
			baseURL: credentials.apiUrl,
			url: buildPath(credentials, options),
			method: httpMethod,
			params: searchParams,
			data: body,
			signal
		})

		data = response.data
	} catch (error) {
		if (signal?.aborted) {
			throw signal.reason
		}

		throw toGreenApiError(error)
	}

	const parsed = schema.safeParse(data === '' ? null : data)

	if (!parsed.success) {
		throw new GreenApiError('INVALID_RESPONSE')
	}

	return parsed.data
}
