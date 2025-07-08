import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    user: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddUserdata: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { AddUserdata } = userSlice.actions
export default userSlice.reducer