import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postdata: null
}


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        AddPost: (state, action) => {
            state.postdata = action.payload
        }
    }
})

export const { AddPost } = postSlice.actions
export default postSlice.reducer

