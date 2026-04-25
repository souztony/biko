import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { api } from '../lib/api'
import './Auth.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/login', { email, password })
      localStorage.setItem('biko:token', response.data.token)
      localStorage.setItem('biko:user', JSON.stringify(response.data.user))
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass animate-fade-in">
        <div className="auth-header">
          <h1>Biko 🚀</h1>
          <p>Conecte-se com outros profissionais</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          
          <Input 
            label="Email" 
            type="email" 
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>Entrar</Button>
        </form>

        <p className="auth-footer">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}
