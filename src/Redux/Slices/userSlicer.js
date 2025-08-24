import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    user: null,
    searchuser: []
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddUserdata: (state, action) => {
            state.user = action.payload
        },
        UpdateSearchUser: (state, action) => {
            state.searchuser = action.payload
        }
    }
})

export const { AddUserdata, UpdateSearchUser } = userSlice.actions
export default userSlice.reducer