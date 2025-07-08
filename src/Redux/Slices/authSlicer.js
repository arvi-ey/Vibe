import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        AddUserID: (state, action) => {
            state.userId = action.payload;
        }
    },
});

export const { AddUserID } = authSlice.actions;
export default authSlice.reducer;
