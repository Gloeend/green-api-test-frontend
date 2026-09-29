import { LoginForm } from '@features/auth-by-credentials'
import { ChatWallpaper } from '@shared/ui/chat-wallpaper'

export const LoginPage = () => {
	return (
		<main className='relative flex min-h-dvh items-center justify-center bg-chat-background p-4 text-chat-foreground'>
			<ChatWallpaper />
			<LoginForm className='relative w-full max-w-sm' />
		</main>
	)
}
