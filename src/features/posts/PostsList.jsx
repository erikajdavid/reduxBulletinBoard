import { useSelector, useDispatch } from "react-redux";
//useSelector will get the global state
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    //const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //this is so that the latest post appears first
    //local compare will return -1, 0, 1 based on if one is greater than the other.
    //local compare converts the date string and lets our sort() function handle the a, b comparise.
    //we are sorting all the posts based on the date string.
    //slice() will return a shallow copy of the array (basically a new array) and this is where we are storing the ordered posts

    // const renderedPosts = orderedPosts.map(post => {
    //     return(
    //     )
    // })

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList;