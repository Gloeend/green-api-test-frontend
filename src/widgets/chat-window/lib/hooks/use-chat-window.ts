import { type Chat, chatSliceActions } from '@entities/chat'
import { useSendMessage } from '@features/send-message'
import { useAppDispatch, useStickToBottom } from '@shared/lib'
import { useCallback } from 'react'

export const useChatWindow = (chat: Chat) => {
	const dispatch = useAppDispatch()
	const { onRetry } = useSendMessage(chat.chatId)
	const { containerRef, onScroll } = useStickToBottom<HTMLDivElement>(chat.messages)

	const onBack = useCallback(() => {
		dispatch(chatSliceActions.selectChat(null))
	}, [dispatch])

	return {
		containerRef,
		onScroll,
		onBack,
		onRetry
	}
}
