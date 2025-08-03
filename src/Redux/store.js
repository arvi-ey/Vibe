import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./Slices/authSlicer"
import userSlice from "./Slices/userSlicer"
import profileSlice from "./Slices/profileSlicer"
import postSlice from "./Slices/postSlicer"
import friendSlice from "./Slices/friendSlicer"
import storySlice from "./Slices/storySlicer"


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        profile: profileSlice,
        post: postSlice,
        friend: friendSlice,
        story: storySlice
    },
});
