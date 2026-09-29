import { cn } from '@shared/lib'
import { Capsule } from '@shared/ui/capsule'
import { ChatWallpaper } from '@shared/ui/chat-wallpaper'

export const ChatWindowEmpty = ({ className }: { className?: string }) => {
	return (
		<section className={cn(className, 'relative flex min-w-0 flex-1 items-center justify-center p-4')}>
			<ChatWallpaper />
			<Capsule className='relative'>Выберите чат, чтобы начать переписку</Capsule>
		</section>
	)
}
