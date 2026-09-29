import { AuthorizedLayout } from '@app/layouts/authorized-layout'
import { UnauthorizedLayout } from '@app/layouts/unauthorized-layout'
import { ChatPage } from '@pages/chat-page'
import { LoginPage } from '@pages/login-page'
import { AppRoutes, RoutePath } from '@shared/config/routes-config'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

const RouterConfig: RouteObject[] = [
	{
		element: <AuthorizedLayout />,
		children: [
			{
				path: RoutePath[AppRoutes.CHAT],
				element: <ChatPage />
			}
		]
	},
	{
		element: <UnauthorizedLayout />,
		children: [
			{
				path: RoutePath[AppRoutes.LOGIN],
				element: <LoginPage />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to={RoutePath[AppRoutes.CHAT]} replace />
	}
]

export const BrowserRouter = createBrowserRouter(RouterConfig)
