import { IconButton } from '@shared/ui/icon-button'
import { LogOut } from 'lucide-react'

import { useLogout } from '../lib/hooks/use-logout'

export const LogoutButton = ({ className }: { className?: string }) => {
	const { onLogout } = useLogout()

	return (
		<IconButton aria-label='Выйти' title='Выйти' className={className} onClick={onLogout}>
			<LogOut />
		</IconButton>
	)
}
