import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  readonly blockNumber: number,
  isLoading: boolean,
}

const initialState: ApplicationState = {
  blockNumber: 0,
  isLoading: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateBlockNumber(state, action) {
      const { blockNumber } = action.payload
      state.blockNumber = blockNumber
    },
    updateLoadingState(state, action) {
      const { isLoading } = action.payload
      state.isLoading = isLoading
    }
  },
})

export const { updateBlockNumber, updateLoadingState } = appSlice.actions
export default appSlice.reducer
