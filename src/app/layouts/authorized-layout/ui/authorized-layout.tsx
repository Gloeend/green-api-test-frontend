import { withAuth } from '@entities/session'
import { useReceiveNotifications } from '@features/receive-notifications'
import { Outlet } from 'react-router'

export const AuthorizedLayout = withAuth(() => {
	useReceiveNotifications()

	return <Outlet />
})
