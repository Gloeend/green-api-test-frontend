import type { store } from '@app/providers/store/config/store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
