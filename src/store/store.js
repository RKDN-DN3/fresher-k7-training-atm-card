import { configureStore } from "@reduxjs/toolkit";
import atmSlice from "./atmSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        atm: atmSlice
    }
})