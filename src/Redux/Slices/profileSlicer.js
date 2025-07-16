import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileInfo: null,
    profileposts: []
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        AddProfileInfo: (state, action) => {
            state.profileInfo = action.payload
        },
        SetProfilePosts: (state, action) => {
            state.profileposts = action.payload
        }
    }
})

export const { AddProfileInfo, SetProfilePosts } = profileSlice.actions
export default profileSlice.reducer