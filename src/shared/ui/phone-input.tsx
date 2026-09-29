import { formatPhone, getPhoneDigits } from '@shared/lib'
import { type ChangeEvent, forwardRef, type InputHTMLAttributes } from 'react'

import { Input } from './input'

const getCaretPosition = (formatted: string, digitsBeforeCaret: number) => {
	if (digitsBeforeCaret === 0) {
		return 0
	}

	let digitsCount = 0

	for (let index = 0; index < formatted.length; index += 1) {
		if (/\d/.test(formatted[index])) {
			digitsCount += 1
		}

		if (digitsCount === digitsBeforeCaret) {
			return index + 1
		}
	}

	return formatted.length
}

export const PhoneInput = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>>(
	({ onChange, ...props }, ref) => {
		const onChangePhone = (ev: ChangeEvent<HTMLInputElement>) => {
			const input = ev.target
			const digitsBeforeCaret = getPhoneDigits(input.value.slice(0, input.selectionStart ?? input.value.length)).length
			const formatted = formatPhone(input.value)

			input.value = formatted

			if (document.activeElement === input) {
				const caretPosition = getCaretPosition(formatted, digitsBeforeCaret)
				input.setSelectionRange(caretPosition, caretPosition)
			}

			onChange?.(ev)
		}

		return <Input ref={ref} type='tel' inputMode='tel' autoComplete='tel' {...props} onChange={onChangePhone} />
	}
)
PhoneInput.displayName = 'PhoneInput'
