import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserCookies = Cookies.get("user");

const initialState = {
  userAuth: getUserCookies ? JSON.parse(getUserCookies) : null,
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStarted: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userAuth = action.payload;
    },
    loginFailed: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.userAuth = null;
    },
  },
});

export const { loginStarted, loginSuccess, loginFailed, logout } =
  authSlice.actions;

export const selectUserAuth = (state) => state.auth.userAuth;

export default authSlice.reducer;
