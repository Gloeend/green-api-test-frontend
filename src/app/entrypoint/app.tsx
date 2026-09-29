import { AppRouterProvider } from '@app/providers/routes'
import { AppStoreProvider } from '@app/providers/store'

import '../styles/index.css'

export const App = () => {
	return (
		<AppStoreProvider>
			<AppRouterProvider />
		</AppStoreProvider>
	)
}
