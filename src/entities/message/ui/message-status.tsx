import { Check, CircleAlert, Clock3, type LucideIcon } from 'lucide-react'

import type { MessageStatusEnum } from '../model/types'

const STATUS_ICONS: Record<MessageStatusEnum, LucideIcon> = {
	PENDING: Clock3,
	SENT: Check,
	FAILED: CircleAlert
}

const STATUS_LABELS: Record<MessageStatusEnum, string> = {
	PENDING: 'Отправляется',
	SENT: 'Отправлено',
	FAILED: 'Не отправлено'
}

export const MessageStatus = ({ status }: { status: MessageStatusEnum }) => {
	const Icon = STATUS_ICONS[status]

	return <Icon role='img' aria-label={STATUS_LABELS[status]} />
}
