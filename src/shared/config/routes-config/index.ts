export const AppRoutes = {
	CHAT: 'chat',
	LOGIN: 'login'
} as const

export const RoutePath: Record<(typeof AppRoutes)[keyof typeof AppRoutes], string> = {
	[AppRoutes.CHAT]: '/',
	[AppRoutes.LOGIN]: '/login'
}
