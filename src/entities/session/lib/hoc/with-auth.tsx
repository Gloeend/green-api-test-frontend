import { AppRoutes, RoutePath } from '@shared/config/routes-config'
import { useAppSelector } from '@shared/lib'
import type { ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router'

import { getSessionCredentials } from '../../model/selectors/session.selectors'

export function withAuth<P extends object>(Component: ComponentType<P>) {
	return (props: P) => {
		const credentials = useAppSelector(getSessionCredentials)
		const { pathname } = useLocation()

		const isLoginPage = pathname === RoutePath[AppRoutes.LOGIN]

		if (!credentials && !isLoginPage) {
			return <Navigate to={RoutePath[AppRoutes.LOGIN]} replace />
		}

		if (credentials && isLoginPage) {
			return <Navigate to={RoutePath[AppRoutes.CHAT]} replace />
		}

		return <Component {...props} />
	}
}
