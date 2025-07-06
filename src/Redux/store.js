import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./Slices/authSlicer"


export const store = configureStore({
    reducer: {
        auth: authSlice

    },
});
