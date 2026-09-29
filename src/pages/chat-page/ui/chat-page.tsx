import { getChatSelected } from '@entities/chat'
import { InstanceSettingsBanner } from '@features/instance-settings'
import { cn, useAppSelector } from '@shared/lib'
import { ChatSidebar } from '@widgets/chat-sidebar'
import { ChatWindow, ChatWindowEmpty } from '@widgets/chat-window'

export const ChatPage = () => {
	const selectedChat = useAppSelector(getChatSelected)

	return (
		<div className='flex h-dvh flex-col overflow-hidden bg-chat-background text-chat-foreground'>
			<InstanceSettingsBanner />
			<main className='flex min-h-0 flex-1'>
				<ChatSidebar className={cn(selectedChat && 'max-768px:hidden')} />
				{selectedChat ? (
					<ChatWindow key={selectedChat.chatId} chat={selectedChat} />
				) : (
					<ChatWindowEmpty className='max-768px:hidden' />
				)}
			</main>
		</div>
	)
}
