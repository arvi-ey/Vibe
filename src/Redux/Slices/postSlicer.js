import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postdata: null,
    homeposts: []
}


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        AddPost: (state, action) => {
            state.postdata = action.payload
        },
        GetAllPost: (state, action) => {
            state.homeposts = action.payload
        },
        AddRecentPost: (state, action) => {
            state.homeposts = [action.payload, ...state.homeposts]
        }
    }
})

export const { AddPost, GetAllPost, AddRecentPost } = postSlice.actions
export default postSlice.reducer

