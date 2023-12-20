import { useSelector } from "react-redux";
//useSelector will get the global state
import { selectAllPosts } from "./postsSlice";

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map(post => {
        return(
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}</p>
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