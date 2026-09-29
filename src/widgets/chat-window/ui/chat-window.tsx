import type { Chat } from '@entities/chat'
import { MessageRow } from '@entities/message'
import { SendMessageForm } from '@features/send-message'
import { cn, formatPhone } from '@shared/lib'
import { Avatar } from '@shared/ui/avatar'
import { Capsule } from '@shared/ui/capsule'
import { ChatWallpaper } from '@shared/ui/chat-wallpaper'
import { IconButton } from '@shared/ui/icon-button'
import { ChevronLeft } from 'lucide-react'

import { useChatWindow } from '../lib/hooks/use-chat-window'

export const ChatWindow = ({ className, chat }: { className?: string; chat: Chat }) => {
	const { containerRef, onScroll, onBack, onRetry } = useChatWindow(chat)

	return (
		<section className={cn(className, 'flex min-w-0 flex-1 flex-col')}>
			<header className='relative z-10 flex h-14 shrink-0 items-center gap-x-2 border-b border-chat-foreground/5 bg-chat-surface pl-4 pr-2 max-768px:pl-1'>
				<IconButton aria-label='Назад к списку чатов' className='hidden max-768px:inline-flex' onClick={onBack}>
					<ChevronLeft />
				</IconButton>
				<Avatar name={chat.name} seed={chat.chatId} />
				<div className='flex min-w-0 flex-col gap-y-px pl-1'>
					<h2 className='truncate font-bold leading-5 tracking-chat'>{chat.name || formatPhone(chat.phone)}</h2>
					{chat.name && chat.phone && (
						<p className='text-xs leading-4 tracking-chat text-chat-muted'>{formatPhone(chat.phone)}</p>
					)}
				</div>
			</header>
			<div className='relative flex min-h-0 flex-1 flex-col'>
				<ChatWallpaper />
				<div ref={containerRef} className='relative min-h-0 flex-1 overflow-y-auto overscroll-contain' onScroll={onScroll}>
					{chat.messages.length > 0 ? (
						<ol
							aria-label='Сообщения'
							className='mx-auto flex min-h-full w-full max-w-3xl flex-col justify-end gap-y-1.5 px-4 pb-2.5 pt-2'
						>
							{chat.messages.map((message, index) => (
								<MessageRow
									key={message.id}
									message={message}
									previousMessage={chat.messages[index - 1]}
									onRetry={onRetry}
								/>
							))}
						</ol>
					) : (
						<div className='flex h-full items-center justify-center p-4'>
							<Capsule>Сообщений пока нет</Capsule>
						</div>
					)}
				</div>
				<div className='relative mx-auto w-full max-w-3xl px-4 pb-2.5 pt-1.5'>
					<SendMessageForm chatId={chat.chatId} />
				</div>
			</div>
		</section>
	)
}
