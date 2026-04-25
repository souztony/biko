import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { api } from '../lib/api'
import { Briefcase, MapPin, Clock, X } from 'lucide-react'
import './Jobs.css'

interface Job {
  id: string
  title: string
  description: string
  createdAt: string
  user: {
    id: string
    name: string
    avatar: string | null
  }
}

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function fetchJobs() {
    try {
      const response = await api.get('/jobs')
      setJobs(response.data)
    } catch (err) {
      console.error('Erro ao buscar vagas', err)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  async function handleCreateJob(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setIsLoading(true)
    try {
      await api.post('/jobs', { title, description })
      setTitle('')
      setDescription('')
      setShowForm(false)
      fetchJobs()
    } catch (err) {
      console.error('Erro ao criar vaga', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="jobs-content animate-fade-in">
        <div className="jobs-header">
          <div>
            <h2>Vagas & Projetos</h2>
            <p>Encontre oportunidades ou publique a sua</p>
          </div>
          <Button onClick={() => setShowForm(true)}>Publicar Vaga</Button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal glass" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Nova Vaga / Projeto</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateJob}>
                <Input
                  label="Título"
                  type="text"
                  placeholder="Ex: Desenvolvedor React — Freelance"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />

                <div className="textarea-group">
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descreva a vaga, requisitos, prazo e orçamento..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                <Button type="submit" isLoading={isLoading}>Publicar</Button>
              </form>
            </div>
          </div>
        )}

        <div className="jobs-list">
          {jobs.map(job => (
            <div key={job.id} className="job-card glass animate-fade-in">
              <div className="job-card-header">
                <div className="job-icon">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <span className="job-meta">
                    <Clock size={14} />
                    {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-footer">
                <div className="job-author">
                  <div className="user-avatar-sm">
                    {job.user.avatar ? <img src={job.user.avatar} alt={job.user.name} /> : job.user.name[0]}
                  </div>
                  <span>{job.user.name}</span>
                </div>

                <button className="contact-btn">Entrar em contato</button>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="empty-state">
              <Briefcase size={48} />
              <p>Nenhuma vaga publicada ainda</p>
              <span>Seja o primeiro a publicar!</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
