import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/Button'
import { api } from '../lib/api'
import './Feed.css'

interface Post {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    avatar: string | null
  }
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function fetchPosts() {
    try {
      const response = await api.get('/posts')
      setPosts(response.data)
    } catch (err) {
      console.error('Erro ao buscar posts', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      await api.post('/posts', { content })
      setContent('')
      fetchPosts()
    } catch (err) {
      console.error('Erro ao criar post', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Navbar />
      
      <main className="feed-content animate-fade-in">
        <form className="create-post-card glass" onSubmit={handleCreatePost}>
          <textarea 
            placeholder="No que você está trabalhando hoje?"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="create-post-footer">
            <Button type="submit" isLoading={isLoading} disabled={!content.trim()}>Postar</Button>
          </div>
        </form>

        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card glass animate-fade-in">
              <div className="post-header">
                <div className="user-avatar">
                  {post.user.avatar ? <img src={post.user.avatar} alt={post.user.name} /> : post.user.name[0]}
                </div>
                <div className="user-info">
                  <strong>{post.user.name}</strong>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="post-body">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
