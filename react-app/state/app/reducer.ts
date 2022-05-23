import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  readonly blockNumber: number,
  notification: {
    isLoading: boolean,
    message: string,
  },
  profile: {
    address: string,
    balance: number,
  },
  products: {
    reloadProduct: boolean,
  }
}

const initialState: ApplicationState = {
  blockNumber: 0,
  notification: {
    isLoading: false,
    message: null,
  },
  profile: {
    address: null,
    balance: 0,
  },
  products: {
    reloadProduct: true,
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
    },
    updateBalance(state, action) {
      const { amount } = action.payload;
      state.profile.balance = state.profile.balance - parseFloat(amount);
    },
    updateReloadProduct(state, action) {
      const { reloadProduct } = action.payload;
      state.products.reloadProduct = reloadProduct;
    }
  },
})

export const { updateBlockNumber, updateLoadingState, updateNotification, updateProfile, updateBalance, updateReloadProduct } = appSlice.actions;
export default appSlice.reducer;
