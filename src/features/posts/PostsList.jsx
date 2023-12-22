import { useSelector } from "react-redux";
//useSelector will get the global state
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //this is so that the latest post appears first
    //local compare will return -1, 0, 1 based on if one is greater than the other.
    //local compare converts the date string and lets our sort() function handle the a, b comparise.
    //we are sorting all the posts based on the date string.
    //slice() will return a shallow copy of the array (basically a new array) and this is where we are storing the ordered posts

    const renderedPosts = orderedPosts.map(post => {
        return(
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}</p>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </article>          
        )
    })
    
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList;