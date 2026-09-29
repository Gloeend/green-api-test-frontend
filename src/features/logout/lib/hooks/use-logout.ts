import { chatSliceActions } from '@entities/chat'
import { clearStoredCredentials, sessionSliceActions } from '@entities/session'
import { AppRoutes, RoutePath } from '@shared/config/routes-config'
import { useAppDispatch } from '@shared/lib'
import { useNavigate } from 'react-router'

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onLogout = () => {
		clearStoredCredentials()
		dispatch(sessionSliceActions.logout())
		dispatch(chatSliceActions.reset())
		navigate(RoutePath[AppRoutes.LOGIN])
	}

	return { onLogout }
}
