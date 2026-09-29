import { getSessionCredentials } from '@entities/session'
import { getGreenApiErrorMessage, greenApi } from '@shared/api/green-api'
import { useAppSelector } from '@shared/lib'
import { useEffect, useState } from 'react'

export const useInstanceSettings = () => {
	const credentials = useAppSelector(getSessionCredentials)
	const [isMisconfigured, setIsMisconfigured] = useState(false)
	const [isFixing, setIsFixing] = useState(false)
	const [isFixRequested, setIsFixRequested] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onFix = async () => {
		if (!credentials) {
			return
		}

		setIsFixing(true)
		setError(null)

		try {
			await greenApi.setSettings(credentials, { webhookUrl: '', incomingWebhook: 'yes' })
			setIsFixRequested(true)
		} catch (fixError) {
			setError(getGreenApiErrorMessage(fixError))
		} finally {
			setIsFixing(false)
		}
	}

	useEffect(() => {
		if (!credentials) {
			return
		}

		const abortController = new AbortController()

		greenApi
			.getSettings(credentials, abortController.signal)
			.then(({ webhookUrl, incomingWebhook }) => {
				setIsMisconfigured(Boolean(webhookUrl) || incomingWebhook !== 'yes')
			})
			.catch((settingsError) => {
				if (!abortController.signal.aborted) {
					console.error(settingsError)
				}
			})

		return () => {
			abortController.abort()
		}
	}, [credentials])

	return {
		isMisconfigured,
		isFixing,
		isFixRequested,
		error,
		onFix
	}
}
