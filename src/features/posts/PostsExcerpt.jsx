import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";

const PostsExcerpt = ({ post }) => {

    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
        </article>
    );

}

export default PostsExcerpt;