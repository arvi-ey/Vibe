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
            state.homeposts = [action.payload, ...state.homeposts]
        },
        GetAllPost: (state, action) => {
            state.homeposts = action.payload
        },
        DeleteHomePost: (state, action) => {
            const { postid } = action.payload
            state.homeposts = state.homeposts.filter(data => data.postid !== postid)
        }
    }
})

export const { AddPost, GetAllPost, DeleteHomePost } = postSlice.actions
export default postSlice.reducer

