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
        },
        AddProfilePost: (state, action) => {
            state.profileposts = [action.payload, ...state.profileposts]
        }
    }
})

export const { AddProfileInfo, SetProfilePosts, AddProfilePost } = profileSlice.actions
export default profileSlice.reducer