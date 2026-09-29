import { getPhoneDigits } from './format-phone'

const SUPPORTED_PHONE_PATTERNS = [/^7\d{10}$/, /^375\d{9}$/]

export const normalizePhone = (value: string) => {
	const digits = getPhoneDigits(value)

	return SUPPORTED_PHONE_PATTERNS.some((pattern) => pattern.test(digits)) ? digits : null
}
