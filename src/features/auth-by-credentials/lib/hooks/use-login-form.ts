import { chatSliceActions, readStoredChats } from '@entities/chat'
import { clearStoredCredentials, getSessionNotice, sessionSliceActions, storeCredentials } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGreenApiErrorMessage, greenApi } from '@shared/api/green-api'
import { ENV_CONFIG } from '@shared/config/environment-config'
import { AppRoutes, RoutePath } from '@shared/config/routes-config'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { STATE_INSTANCE_MESSAGES } from '../../model/consts'

import { type LoginSchema, useLoginSchema } from './use-login-schema'

export const useLoginForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const notice = useAppSelector(getSessionNotice)
	const loginSchema = useLoginSchema()
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			idInstance: '',
			apiTokenInstance: '',
			apiUrl: ENV_CONFIG.VITE_GREEN_API_URL,
			isRemembered: false
		}
	})

	const onSubmit = async (values: LoginSchema) => {
		const parsed = loginSchema.safeParse(values)

		if (!parsed.success) {
			form.setError('root', { message: 'Проверьте заполнение полей' })
			return
		}

		const { isRemembered, ...credentials } = parsed.data

		try {
			const { stateInstance } = await greenApi.getStateInstance(credentials)

			if (stateInstance !== 'authorized') {
				form.setError('root', {
					message: STATE_INSTANCE_MESSAGES[stateInstance] ?? `Инстанс не готов к работе: ${stateInstance}`
				})
				return
			}
		} catch (error) {
			form.setError('root', { message: getGreenApiErrorMessage(error) })
			return
		}

		if (isRemembered) {
			storeCredentials(credentials)
		} else {
			clearStoredCredentials()
		}

		dispatch(sessionSliceActions.login(credentials))
		dispatch(chatSliceActions.setItems(readStoredChats(credentials.idInstance)))
		navigate(RoutePath[AppRoutes.CHAT])
	}

	return {
		form,
		notice,
		onSubmit: form.handleSubmit(onSubmit)
	}
}
