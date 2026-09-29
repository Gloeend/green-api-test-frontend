import { chatSliceActions, getChatSelectedChatId, getChatSortedItems } from '@entities/chat'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { type MouseEvent, useCallback, useState } from 'react'

export const useChatSidebar = () => {
	const dispatch = useAppDispatch()
	const chats = useAppSelector(getChatSortedItems)
	const selectedChatId = useAppSelector(getChatSelectedChatId)
	const [isCreating, setIsCreating] = useState(false)

	const onSelectChat = useCallback(
		(ev: MouseEvent<HTMLButtonElement>) => {
			const { id } = ev.currentTarget.dataset

			if (!id) {
				return
			}

			dispatch(chatSliceActions.selectChat(id))
		},
		[dispatch]
	)

	const onToggleCreating = () => {
		setIsCreating((prev) => !prev)
	}

	const onCreated = useCallback(() => {
		setIsCreating(false)
	}, [])

	return {
		chats,
		selectedChatId,
		isCreating,
		onSelectChat,
		onToggleCreating,
		onCreated
	}
}
