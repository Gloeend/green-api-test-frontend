const PHONE_MASKS = [
	{ code: '375', groups: [2, 3, 2, 2] },
	{ code: '7', groups: [3, 3, 2, 2] }
] as const

const GROUP_SEPARATORS = [' (', ') ', '-', '-']

const MAX_PHONE_DIGITS = 15

export const getPhoneDigits = (value: string) => {
	const digits = value.replace(/\D/g, '')

	if (digits.startsWith('8')) {
		return `7${digits.slice(1)}`
	}

	if (digits.startsWith('9')) {
		return `7${digits}`
	}

	return digits
}

export const formatPhone = (value: string) => {
	const digits = getPhoneDigits(value)

	if (!digits) {
		return ''
	}

	const mask = PHONE_MASKS.find((needle) => digits.startsWith(needle.code))

	if (!mask) {
		return `+${digits.slice(0, MAX_PHONE_DIGITS)}`
	}

	let restDigits = digits.slice(mask.code.length)
	let formatted = `+${mask.code}`

	mask.groups.forEach((size, index) => {
		if (!restDigits) {
			return
		}

		formatted += `${GROUP_SEPARATORS[index]}${restDigits.slice(0, size)}`
		restDigits = restDigits.slice(size)
	})

	return formatted
}
