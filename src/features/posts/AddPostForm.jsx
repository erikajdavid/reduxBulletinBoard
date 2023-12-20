import { useState } from 'react'
//we are not using useSelector here because we are not going to send this info to the global state. 
//we only want to send things to the global state that are going to be used in multiple components.

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    return (
        <section>
            <h2>Add Post</h2>
            <form>
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    required
                >  
                </input>

                <label htmlFor='postTitle'>Post Content:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    required
                >  
                </input>

                <button type="submit">Save Post</button>
            </form>

        </section>
    )
}

export default AddPostForm;