import { createSlice } from "@reduxjs/toolkit";
import { Upload } from "lucide-react";

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
        },
        DeleteProfilePost: (state, action) => {
            const { postid } = action.payload
            state.profileposts = state.profileposts.filter(data => data.postid !== postid)
        },
    }
})

export const { AddProfileInfo, SetProfilePosts, AddProfilePost, DeleteProfilePost } = profileSlice.actions
export default profileSlice.reducer