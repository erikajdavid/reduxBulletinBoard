import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '0',
        name: 'Jessica',
    },
    {
        id: '1',
        name: 'Matt',
    },
    {
        id: '3',
        name: 'Linda',
    },
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer