import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  readonly blockNumber: number,
  notification: {
    isLoading: boolean,
    message: string,
  },
  profile: {
    address: string,
    balance: string,
  }
}

const initialState: ApplicationState = {
  blockNumber: 0,
  notification: {
    isLoading: false,
    message: '',
  },
  profile: {
    address: '',
    balance: '',
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
      state.notification = { message, isLoading: true };
    },
    updateProfile(state, action) {
      const { address, balance } = action.payload;
      state.profile = { address, balance };
    }
  },
})

export const { updateBlockNumber, updateLoadingState, updateNotification, updateProfile } = appSlice.actions;
export default appSlice.reducer;
