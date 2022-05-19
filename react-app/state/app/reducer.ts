import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  readonly blockNumber: number,
  notification: {
    isLoading: boolean,
    message: string,
  }
}

const initialState: ApplicationState = {
  blockNumber: 0,
  notification: {
    isLoading: false,
    message: '',
  }
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
      state.notification.isLoading = isLoading;
    },
    updateNotification(state, action) {
      const { message } = action.payload;
      state.notification.message = message;
      state.notification.isLoading = true;
    }
  },
})

export const { updateBlockNumber, updateLoadingState, updateNotification } = appSlice.actions
export default appSlice.reducer
