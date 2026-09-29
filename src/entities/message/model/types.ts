export type MessageDirectionEnum = 'INCOMING' | 'OUTGOING'

export type MessageStatusEnum = 'PENDING' | 'SENT' | 'FAILED'

export type Message = {
	id: string
	idMessage?: string
	text: string
	direction: MessageDirectionEnum
	status?: MessageStatusEnum
	timestamp: number
}
