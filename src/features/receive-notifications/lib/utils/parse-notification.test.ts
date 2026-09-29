import { describe, expect, it } from 'vitest'

import { parseNotification } from './parse-notification'

const senderData = {
	chatId: '10000000',
	chatName: 'Chat Name',
	chatType: 'user',
	sender: '10000000',
	senderName: 'Sender Name',
	senderPhoneNumber: 79876543210
}

const createIncoming = (messageData: unknown, overrides: Record<string, unknown> = {}) => ({
	typeWebhook: 'incomingMessageReceived',
	instanceData: { idInstance: 1101000001, wid: '79991234567@c.us', typeInstance: 'v3' },
	timestamp: 1763115112,
	idMessage: '126543123451133331119',
	senderData,
	messageData,
	...overrides
})

describe('parseNotification', () => {
	it('разбирает textMessage', () => {
		const body = createIncoming({ typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } })

		expect(parseNotification(body)).toEqual({
			chatId: '10000000',
			senderName: 'Sender Name',
			senderPhone: '79876543210',
			idMessage: '126543123451133331119',
			text: 'Привет',
			timestamp: 1763115112000
		})
	})

	it('берёт текст extendedTextMessage из extendedTextMessageData.text', () => {
		const body = createIncoming({
			typeMessage: 'extendedTextMessage',
			extendedTextMessageData: { text: 'Ссылка https://green-api.com', title: 'GREEN-API', description: '' }
		})

		expect(parseNotification(body)?.text).toBe('Ссылка https://green-api.com')
	})

	it('подставляет chatName, если senderName пустой, и пустой телефон, если номера нет', () => {
		const body = createIncoming(
			{ typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } },
			{ senderData: { chatId: '10000000', chatName: 'Chat Name', senderName: '' } }
		)

		expect(parseNotification(body)).toMatchObject({ senderName: 'Chat Name', senderPhone: '' })
	})

	it.each([
		['исходящее сообщение', { ...createIncoming({}), typeWebhook: 'outgoingAPIMessageReceived' }],
		['статус сообщения', { typeWebhook: 'outgoingMessageStatus', status: 'delivered', idMessage: '1' }],
		['смена состояния инстанса', { typeWebhook: 'stateInstanceChanged', stateInstance: 'authorized' }],
		['медиа', createIncoming({ typeMessage: 'imageMessage', fileMessageData: { downloadUrl: '' } })],
		[
			'групповой чат',
			createIncoming(
				{ typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } },
				{
					senderData: { ...senderData, chatId: '-10000000000000', chatType: 'group' }
				}
			)
		],
		['пустое тело', null],
		['мусор', 'not a notification']
	])('возвращает null для типа «%s»', (_, body) => {
		expect(parseNotification(body)).toBeNull()
	})
})
