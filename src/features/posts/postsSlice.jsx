//slice is where you divide up the state
//this slice handles everything related to the posts. 


//redux does everything synchoronously so anything asynchonous has to happen outside the store. this is where redux middlewear comes in. the most common async middleware is redux thunk. 
//thunks are recommended as the standard approach for writing async logic with redux. 
//what does thunk mean? the word thunk is a programming term that means "a piece of code that does some delayed work" 

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

//const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//hard coding this in for now...
// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: 'Blah blah blah',
//         date: sub(new Date(), { minutes: 10 }).toISOString()
//     },
//     {
//         id: '2',
//         title: 'Learning about slices',
//         content: 'Blah blah blah blah blah',
//         date: sub(new Date(), { minutes: 5 }).toISOString()
//     },
// ]

//we are commeting out the original initial state now bc that is a static state. we now want to bring in information from an API server (dynamic).

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

//createAsyncThunk accepts two arguments: the first is a string that us used a the prefix for the generated action type, and the second is a creator payload callback callback. the latter should return a promise that contains the data or a rejected promise with an error. 

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
        //sometimes a slice reducer needs to respond to other actions that weren't defined as part of the slice's reducers. 
        //the builder parameter is an object that let's us defined additonal case reducers that run in response to the actions defined outside of the slice (i.e. the fetchPosts)
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer