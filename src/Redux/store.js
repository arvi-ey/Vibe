import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./Slices/authSlicer"
import userSlice from "./Slices/userSlicer"
import profileSlice from "./Slices/profileSlicer"


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        profile: profileSlice

    },
});
