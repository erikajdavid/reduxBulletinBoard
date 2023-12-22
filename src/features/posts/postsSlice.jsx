//slice is where you divide up the state
//this slice handles everything related to the posts. 

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

//hard coding this in for now...
const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Blah blah blah',
        date: sub(new Date(), { minutes: 10 }).toISOString()
    },
    {
        id: '2',
        title: 'Learning about slices',
        content: 'Blah blah blah blah blah',
        date: sub(new Date(), { minutes: 5 }).toISOString()
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
            state.push(action.payload) 
            //payload is the form data ssubmitted by the user
            //we are pushing to state which is mutating the state
            //we can only mutate the state inside the createSlice and nowhere else
            //we can do this here because of immerjs
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer