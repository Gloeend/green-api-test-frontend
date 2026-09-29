import { zodResolver } from '@hookform/resolvers/zod'
import type { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { useSendMessage } from './use-send-message'
import { type SendMessageSchema, useSendMessageSchema } from './use-send-message-schema'

export const useSendMessageForm = (chatId: string) => {
	const { onSend } = useSendMessage(chatId)
	const sendMessageSchema = useSendMessageSchema()
	const form = useForm<SendMessageSchema>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: ''
		}
	})

	const text = form.watch('text')

	const onSubmit = (values: SendMessageSchema) => {
		const parsed = sendMessageSchema.safeParse(values)

		if (!parsed.success) {
			return
		}

		onSend(parsed.data.text)
		form.reset()
	}

	const submit = form.handleSubmit(onSubmit)

	const onKeyDown = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
		if (ev.key !== 'Enter' || ev.shiftKey || ev.nativeEvent.isComposing) {
			return
		}

		ev.preventDefault()
		submit().catch(console.error)
	}

	return {
		form,
		hasText: text.trim().length > 0,
		onKeyDown,
		onSubmit: submit
	}
}
