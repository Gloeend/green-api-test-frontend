import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { GreenApiCredentials } from '@shared/api/green-api'

type InitialState = {
	credentials: GreenApiCredentials | null
	notice: string | null
}

const INITIAL_STATE: InitialState = {
	credentials: null,
	notice: null
}

const sessionSlice = createSlice({
	name: 'session',
	initialState: INITIAL_STATE,
	reducers: {
		login: (state, { payload }: PayloadAction<GreenApiCredentials>) => {
			state.credentials = payload
			state.notice = null
		},
		expire: (state, { payload }: PayloadAction<string>) => {
			state.credentials = null
			state.notice = payload
		},
		logout: () => INITIAL_STATE
	}
})

export const sessionSliceActions = sessionSlice.actions
export const sessionSliceReducer = sessionSlice.reducer
