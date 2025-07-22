import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: [],
    friendRequests: [],
}
const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers:
    {
        AddFriends: (state, action) => {
            state.friends = [action.payload, ...state.friends]
        },
        GetFriends: (state, action) => {
            state.friends = action.payload
        }
    }
})

export const { AddFriends, GetFriends } = friendSlice.actions
export default friendSlice.reducer