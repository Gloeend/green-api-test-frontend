import { cn, formatDayLabel, formatMessageTime, isSameDay } from '@shared/lib'
import { Bubble, BubbleMeta } from '@shared/ui/bubble'
import { Capsule } from '@shared/ui/capsule'
import { RotateCw } from 'lucide-react'
import type { MouseEvent } from 'react'

import type { Message } from '../model/types'

import { MessageStatus } from './message-status'

export const MessageRow = ({
	message,
	previousMessage,
	onRetry
}: {
	message: Message
	previousMessage?: Message
	onRetry: (ev: MouseEvent<HTMLButtonElement>) => void
}) => {
	const isOutgoing = message.direction === 'OUTGOING'
	const isNewDay = !previousMessage || !isSameDay(previousMessage.timestamp, message.timestamp)

	return (
		<>
			{isNewDay && (
				<li className='flex justify-center py-1.5'>
					<Capsule>{formatDayLabel(message.timestamp)}</Capsule>
				</li>
			)}
			<li className={cn('flex flex-col', isOutgoing ? 'items-end' : 'items-start')}>
				<Bubble variant={isOutgoing ? 'outgoing' : 'incoming'}>
					{message.text}
					<BubbleMeta>
						<time dateTime={new Date(message.timestamp).toISOString()}>{formatMessageTime(message.timestamp)}</time>
						{message.status && <MessageStatus status={message.status} />}
					</BubbleMeta>
				</Bubble>
				{message.status === 'FAILED' && (
					<button
						type='button'
						data-id={message.id}
						className='mt-1 flex items-center gap-x-1 text-xs leading-4 text-chat-danger active:opacity-50'
						onClick={onRetry}
					>
						<RotateCw className='size-3.5' />
						Не отправлено. Повторить
					</button>
				)}
			</li>
		</>
	)
}
