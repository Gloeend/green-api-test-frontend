import { greenApi, type GreenApiCredentials, isGreenApiAuthError } from '@shared/api/green-api'

import { parseNotification } from '../../lib/utils/parse-notification'
import { POLLING_CONFIG } from '../consts'
import type { IncomingTextMessage } from '../types'

const wait = (ms: number, signal: AbortSignal) => {
	return new Promise<void>((resolve) => {
		const timeoutId = setTimeout(resolve, ms)

		signal.addEventListener(
			'abort',
			() => {
				clearTimeout(timeoutId)
				resolve()
			},
			{ once: true }
		)
	})
}

export class NotificationPollingService {
	private readonly credentials: GreenApiCredentials
	private readonly onMessage: (message: IncomingTextMessage) => void
	private readonly onUnauthorized: VoidFunction
	private abortController: AbortController | null = null

	constructor(
		credentials: GreenApiCredentials,
		onMessage: (message: IncomingTextMessage) => void,
		onUnauthorized: VoidFunction
	) {
		this.credentials = credentials
		this.onMessage = onMessage
		this.onUnauthorized = onUnauthorized
	}

	public start() {
		if (this.abortController) return

		this.abortController = new AbortController()
		this.poll(this.abortController.signal).catch(console.error)
	}

	public stop() {
		if (!this.abortController) return

		this.abortController.abort()
		this.abortController = null
	}

	private async poll(signal: AbortSignal) {
		let backoffMs: number = POLLING_CONFIG.BACKOFF_START_MS

		while (!signal.aborted) {
			try {
				await this.receiveNext(signal)
				backoffMs = POLLING_CONFIG.BACKOFF_START_MS
			} catch (error) {
				if (signal.aborted) {
					return
				}

				if (isGreenApiAuthError(error)) {
					this.onUnauthorized()
					return
				}

				await wait(backoffMs, signal)
				backoffMs = Math.min(backoffMs * 2, POLLING_CONFIG.BACKOFF_MAX_MS)
			}
		}
	}

	private async receiveNext(signal: AbortSignal) {
		const notification = await greenApi.receiveNotification(this.credentials, POLLING_CONFIG.RECEIVE_TIMEOUT_SEC, signal)

		if (!notification) {
			return
		}

		const message = parseNotification(notification.body)

		if (message) {
			this.onMessage(message)
		}

		await greenApi.deleteNotification(this.credentials, notification.receiptId, signal)
	}
}
