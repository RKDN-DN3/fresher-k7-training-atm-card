import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listATM: [],
  isLoading: false,
  isError: false,
};

export const atmSlice = createSlice({
  name: "atm",
  initialState,
  reducers: {
    getATMStarted: (state) => {
      state.isLoading = true;
    },
    getATMSuccess: (state, action) => {
      state.isLoading = false;
      state.listATM = action.payload;
    },
    getATMFailed: (state) => {
        state.isError = true;
        state.isLoading = false;
    }
  },
});

export const {getATMStarted, getATMSuccess, getATMFailed} = atmSlice.actions;

export const selectListATM = (state) => state.atm.listATM;

export default atmSlice.reducer;
