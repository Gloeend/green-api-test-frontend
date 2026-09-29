import { describe, expect, it } from 'vitest'

import { normalizePhone } from './normalize-phone'

describe('normalizePhone', () => {
	it.each([
		['+7 (999) 123-45-67', '79991234567'],
		['8 999 123 45 67', '79991234567'],
		['79991234567', '79991234567'],
		['+375 (29) 123-45-67', '375291234567'],
		['  +7-999-123-45-67  ', '79991234567'],
		['999 123-45-67', '79991234567']
	])('приводит %s к %s', (value, expected) => {
		expect(normalizePhone(value)).toBe(expected)
	})

	it.each(['', '12345', '+7 (999) 123-45', '+1 202 555 0123', '+380 67 123 45 67', '7999123456789'])(
		'возвращает null для неподдерживаемого номера %s',
		(value) => {
			expect(normalizePhone(value)).toBeNull()
		}
	)
})
