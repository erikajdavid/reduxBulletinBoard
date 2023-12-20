import './App.css'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'

function App() {

  return (
    <main>
      <h1>Bulletin Board</h1>
      <AddPostForm />
      <PostsList />
    </main>
  )
}

export default App
