import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileInfo: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        AddProfileInfo: (state, action) => {
            state.profileInfo = action.payload
        }
    }
})

export const { AddProfileInfo } = profileSlice.actions
export default profileSlice.reducer