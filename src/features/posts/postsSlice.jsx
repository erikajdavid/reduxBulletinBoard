//slice is where you divide up the state
//this slice handles everything related to the posts. 

//redux does everything synchoronously so anything asynchonous has to happen outside the store. this is where redux middlewear comes in. the most common async middleware is redux thunk. 
//thunks are recommended as the standard approach for writing async logic with redux. 
//what does thunk mean? the word thunk is a programming term that means "a piece of code that does some delayed work" 

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

//we are commeting out the original initial state now bc that is a static state. we now want to bring in information from an API server (dynamic).

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

const initialState = {
    posts: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
}

//createAsyncThunk accepts two arguments: the first is a string that us used a the prefix for the generated action type, and the second is a creator payload callback callback. the latter should return a promise that contains the data or a rejected promise with an error. 

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        console.log(response.data)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
            state.posts.push(action.payload) 
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
    },
    //sometimes a slice reducer needs to respond to other actions that weren't defined as part of the slice's reducers. 
    //the builder parameter is an object that let's us defined additonal case reducers that run in response to the actions defined outside of the slice (i.e. the fetchPosts)
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    return post;
                });

                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();

                console.log(action.payload)
                state.posts.push(action.payload)
             })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer