import { withAuth } from '@entities/session'
import { Outlet } from 'react-router'

export const UnauthorizedLayout = withAuth(() => {
	return <Outlet />
})
