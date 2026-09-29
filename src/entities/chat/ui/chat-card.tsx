import type { Message } from '@entities/message'
import { cn, formatChatListTime, formatPhone } from '@shared/lib'
import { Avatar } from '@shared/ui/avatar'
import type { MouseEvent } from 'react'

import type { Chat } from '../model/types'

const getPreview = (lastMessage?: Message) => {
	if (!lastMessage) {
		return 'Сообщений пока нет'
	}

	return lastMessage.direction === 'OUTGOING' ? `Вы: ${lastMessage.text}` : lastMessage.text
}

export const ChatCard = ({
	chat,
	isActive,
	onClick
}: {
	chat: Chat
	isActive: boolean
	onClick: (ev: MouseEvent<HTMLButtonElement>) => void
}) => {
	const lastMessage = chat.messages[chat.messages.length - 1]

	return (
		<button
			type='button'
			data-id={chat.chatId}
			aria-current={isActive}
			className={cn(
				'flex w-full items-center gap-x-3 rounded-xl p-2 text-left transition-colors hover:bg-chat-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-chat-accent',
				isActive && 'bg-chat-foreground/10 hover:bg-chat-foreground/10'
			)}
			onClick={onClick}
		>
			<Avatar size='lg' name={chat.name} seed={chat.chatId} />
			<span className='flex min-w-0 flex-1 flex-col gap-y-0.5'>
				<span className='flex items-baseline gap-x-2'>
					<span className='flex-1 truncate font-bold leading-5 tracking-chat'>{chat.name || formatPhone(chat.phone)}</span>
					{lastMessage && (
						<time dateTime={new Date(lastMessage.timestamp).toISOString()} className='shrink-0 text-xs text-chat-muted'>
							{formatChatListTime(lastMessage.timestamp)}
						</time>
					)}
				</span>
				<span className='truncate text-sm leading-[18px] text-chat-muted'>{getPreview(lastMessage)}</span>
			</span>
		</button>
	)
}
