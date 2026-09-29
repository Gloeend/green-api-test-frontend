import type { GreenApiCredentials } from '@shared/api/green-api'
import { readStorage, removeStorage, writeStorage } from '@shared/lib'

import { StorageKeys } from '../../model/consts'
import { credentialsSchema } from '../../model/schemas/credentials.schema'

export const readStoredCredentials = () => {
	return readStorage('SESSION', StorageKeys.CREDENTIALS, credentialsSchema)
}

export const storeCredentials = (credentials: GreenApiCredentials) => {
	writeStorage('SESSION', StorageKeys.CREDENTIALS, credentials)
}

export const clearStoredCredentials = () => {
	removeStorage('SESSION', StorageKeys.CREDENTIALS)
}
