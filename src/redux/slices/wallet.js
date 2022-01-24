import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null,
  talBalance: null,
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // WALLET ACTIVE
    setActivatingConnector(state, action) {
      state.activatingConnector = action.payload;
    },

    // BALANCE
    setBalance(state, action) {
      state.balance = action.payload;
    },

    // TAL BALANCE
    setTalBalance(state, action) {
      state.talBalance = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, setActivatingConnector, setBalance, setTalBalance } = slice.actions;

// ----------------------------------------------------------------------

export function getWalletBalance(account, library) {
  return async (dispatch) => {
    try {
      if (!!account && !!library) {
        library
          .getBalance(account)
          .then((balance) => {
            // console.log('wallet account = ', account);
            dispatch(slice.actions.setBalance(balance));
          })
          .catch(() => {
            dispatch(slice.actions.setBalance(null));
          });
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}
