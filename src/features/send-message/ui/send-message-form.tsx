import { GREEN_API_CONFIG } from '@shared/config/green-api-config'
import { cn } from '@shared/lib'
import { IconButton } from '@shared/ui/icon-button'
import { TextareaAutosize } from '@shared/ui/textarea-autosize'
import { ArrowUp } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { useSendMessageForm } from '../lib/hooks/use-send-message-form'

export const SendMessageForm = ({ className, chatId }: { className?: string; chatId: string }) => {
	const { form, hasText, onKeyDown, onSubmit } = useSendMessageForm(chatId)

	return (
		<form
			className={cn(className, 'flex items-end gap-x-0.5 rounded-2xl bg-chat-surface p-1 shadow-sm dark:shadow-none')}
			onSubmit={onSubmit}
		>
			<Controller
				name='text'
				control={form.control}
				render={({ field }) => (
					<TextareaAutosize
						{...field}
						autoFocus
						maxLength={GREEN_API_CONFIG.MESSAGE_MAX_LENGTH}
						placeholder='Сообщение'
						aria-label='Сообщение'
						className='min-h-10 px-3 py-2.5 text-base leading-5 tracking-chat placeholder:text-chat-muted'
						onKeyDown={onKeyDown}
					/>
				)}
			/>
			{hasText && (
				<IconButton
					type='submit'
					variant='accent'
					aria-label='Отправить'
					className='animate-pop-in motion-reduce:animate-none'
				>
					<ArrowUp />
				</IconButton>
			)}
		</form>
	)
}
