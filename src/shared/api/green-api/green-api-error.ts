import type { GreenApiErrorStatusEnum } from './types'

const ERROR_MESSAGES: Partial<Record<GreenApiErrorStatusEnum, string>> = {
	NETWORK_ERROR: 'Не удалось подключиться к GREEN-API. Проверьте apiUrl и интернет',
	INVALID_RESPONSE: 'GREEN-API вернул ответ в неожиданном формате',
	400: 'GREEN-API отклонил запрос. Проверьте, что инстанс авторизован в MAX',
	401: 'Неверный apiTokenInstance',
	403: 'Неверный idInstance или apiUrl',
	429: 'Слишком много запросов, попробуйте чуть позже',
	466: 'Исчерпан лимит тарифа «Разработчик»',
	469: 'MAX временно ограничил проверку номеров, попробуйте через 2 часа'
}

export class GreenApiError extends Error {
	public readonly status: GreenApiErrorStatusEnum

	constructor(status: GreenApiErrorStatusEnum) {
		super(`GREEN-API request failed: ${status}`)
		this.name = 'GreenApiError'
		this.status = status
	}
}

export const isGreenApiAuthError = (error: unknown) => {
	return error instanceof GreenApiError && (error.status === 401 || error.status === 403)
}

export const getGreenApiErrorMessage = (error: unknown) => {
	if (!(error instanceof GreenApiError)) {
		return 'Что-то пошло не так, попробуйте ещё раз'
	}

	return ERROR_MESSAGES[error.status] ?? `Ошибка GREEN-API (код ${error.status})`
}
