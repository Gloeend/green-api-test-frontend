import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

const rootContainer = document.getElementById('root')

if (!rootContainer) {
	throw new Error('Root container element with id "root" not found in the DOM.')
}

const root = createRoot(rootContainer)

root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
