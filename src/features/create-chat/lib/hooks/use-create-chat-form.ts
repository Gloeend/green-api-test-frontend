import { chatSliceActions, getChatItems } from '@entities/chat'
import { getSessionCredentials } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGreenApiErrorMessage, greenApi } from '@shared/api/green-api'
import { normalizePhone, useAppDispatch, useAppSelector } from '@shared/lib'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { type CreateChatSchema, useCreateChatSchema } from './use-create-chat-schema'

const NO_ACCOUNT_MESSAGE = 'У этого номера нет аккаунта MAX'

export const useCreateChatForm = (onCreated: VoidFunction) => {
	const dispatch = useAppDispatch()
	const credentials = useAppSelector(getSessionCredentials)
	const chats = useAppSelector(getChatItems)
	const missingPhonesRef = useRef(new Set<string>())
	const createChatSchema = useCreateChatSchema()
	const form = useForm<CreateChatSchema>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			phone: ''
		}
	})

	const openChat = (chatId: string) => {
		dispatch(chatSliceActions.selectChat(chatId))
		form.reset()
		onCreated()
	}

	const onSubmit = async (values: CreateChatSchema) => {
		const parsed = createChatSchema.safeParse(values)
		const phone = parsed.success ? normalizePhone(parsed.data.phone) : null

		if (!phone || !credentials) {
			return
		}

		const foundChat = chats.find((needle) => needle.phone === phone)

		if (foundChat) {
			openChat(foundChat.chatId)
			return
		}

		if (missingPhonesRef.current.has(phone)) {
			form.setError('phone', { message: NO_ACCOUNT_MESSAGE })
			return
		}

		try {
			const { exist, chatId } = await greenApi.checkAccount(credentials, { phoneNumber: Number(phone) })

			if (!exist || !chatId) {
				missingPhonesRef.current.add(phone)
				form.setError('phone', { message: NO_ACCOUNT_MESSAGE })
				return
			}

			dispatch(chatSliceActions.addChat({ chatId, name: '', phone, updatedAt: Date.now() }))
			openChat(chatId)
		} catch (error) {
			form.setError('phone', { message: getGreenApiErrorMessage(error) })
		}
	}

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit)
	}
}
