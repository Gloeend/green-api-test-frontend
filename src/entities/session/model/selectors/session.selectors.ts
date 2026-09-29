import type { RootState } from '@shared/config/store-config'

export const getSessionCredentials = (store: RootState) => store.session.credentials
export const getSessionNotice = (store: RootState) => store.session.notice
