import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { api } from '../lib/api'
import { Briefcase, FileText, Calendar } from 'lucide-react'
import './Profile.css'

interface UserProfile {
  id: string
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  posts: { id: string; content: string; createdAt: string }[]
  jobs: { id: string; title: string; description: string; createdAt: string }[]
}

export function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState<'posts' | 'jobs'>('posts')

  useEffect(() => {
    if (!id) return

    api.get(`/auth/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => navigate('/'))
  }, [id])

  if (!user) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="loading-state">Carregando perfil...</div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="profile-content animate-fade-in">
        {/* Capa */}
        <div className="profile-cover glass">
          <div className="cover-gradient" />
          <div className="profile-info">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                user.name[0]
              )}
            </div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              {user.bio && <p className="profile-bio">{user.bio}</p>}
              <div className="profile-stats">
                <span><FileText size={14} /> {user.posts.length} posts</span>
                <span><Briefcase size={14} /> {user.jobs.length} vagas</span>
                <span>
                  <Calendar size={14} />
                  Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs glass">
          <button
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FileText size={16} /> Posts
          </button>
          <button
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={16} /> Vagas
          </button>
        </div>

        {/* Conteúdo */}
        <div className="profile-items">
          {activeTab === 'posts' && (
            <>
              {user.posts.length === 0 ? (
                <div className="empty-state">
                  <FileText size={40} />
                  <p>Nenhum post ainda</p>
                </div>
              ) : (
                user.posts.map(post => (
                  <div key={post.id} className="profile-item-card glass animate-fade-in">
                    <p>{post.content}</p>
                    <span className="item-date">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'jobs' && (
            <>
              {user.jobs.length === 0 ? (
                <div className="empty-state">
                  <Briefcase size={40} />
                  <p>Nenhuma vaga publicada</p>
                </div>
              ) : (
                user.jobs.map(job => (
                  <div key={job.id} className="profile-item-card glass animate-fade-in">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <span className="item-date">
                      {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
