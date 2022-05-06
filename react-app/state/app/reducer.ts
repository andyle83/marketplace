import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  readonly blockNumber: number,
  isLoading: boolean,
  notificationMessage: string,
}

const initialState: ApplicationState = {
  blockNumber: 0,
  isLoading: true,
  notificationMessage: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateBlockNumber(state, action) {
      const { blockNumber } = action.payload;
      state.blockNumber = blockNumber;
    },
    updateLoadingState(state, action) {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
    updateNotificationMessage(state, action) {
      const { notificationMessage } = action.payload;
      state.notificationMessage = notificationMessage;
    }
  },
})

export const { updateBlockNumber, updateLoadingState, updateNotificationMessage } = appSlice.actions
export default appSlice.reducer
