//slice is where you divide up the state
//this slice handles everything related to the posts. 

import { createSlice } from "@reduxjs/toolkit";

//hard coding this in for now...
const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Blah blah blah'
    },
    {
        id: '2',
        title: 'Learning about slices',
        content: 'Blah blah blah blah blah'
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

export const selectAllPosts = (state) => state.posts

export default postsSlice.reducer