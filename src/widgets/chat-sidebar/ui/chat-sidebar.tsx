import { ChatCard } from '@entities/chat'
import { CreateChatForm } from '@features/create-chat'
import { LogoutButton } from '@features/logout'
import { cn } from '@shared/lib'
import { IconButton } from '@shared/ui/icon-button'
import { SquarePen, X } from 'lucide-react'

import { useChatSidebar } from '../lib/hooks/use-chat-sidebar'

export const ChatSidebar = ({ className }: { className?: string }) => {
	const { chats, selectedChatId, isCreating, onSelectChat, onToggleCreating, onCreated } = useChatSidebar()

	return (
		<aside
			className={cn(
				className,
				'flex w-[340px] shrink-0 flex-col border-r border-chat-foreground/10 bg-chat-surface max-768px:w-full max-768px:border-r-0'
			)}
		>
			<header className='flex h-14 shrink-0 items-center gap-x-1 pl-4 pr-2'>
				<h1 className='flex-1 text-xl font-bold tracking-chat'>Чаты</h1>
				<IconButton
					aria-label={isCreating ? 'Отменить создание чата' : 'Новый чат'}
					title={isCreating ? 'Отменить' : 'Новый чат'}
					aria-expanded={isCreating}
					onClick={onToggleCreating}
				>
					{isCreating ? <X /> : <SquarePen />}
				</IconButton>
				<LogoutButton />
			</header>
			{isCreating && <CreateChatForm className='px-4 pb-3' onCreated={onCreated} />}
			{chats.length > 0 ? (
				<ul className='flex min-h-0 flex-1 flex-col gap-y-0.5 overflow-y-auto px-2 pb-2'>
					{chats.map((chat) => (
						<li key={chat.chatId}>
							<ChatCard chat={chat} isActive={chat.chatId === selectedChatId} onClick={onSelectChat} />
						</li>
					))}
				</ul>
			) : (
				<div className='flex flex-1 flex-col items-center justify-center gap-y-1 px-6 text-center'>
					<p className='font-bold leading-5 tracking-chat'>Чатов пока нет</p>
					<p className='text-sm leading-[18px] text-chat-muted'>Нажмите «Новый чат» и введите номер получателя</p>
				</div>
			)}
		</aside>
	)
}
