import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { api } from '../lib/api'
import './Auth.css'

export function Register() {
  const [name, setName] = useState('')
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
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass animate-fade-in">
        <div className="auth-header">
          <h1>Biko 🚀</h1>
          <p>Crie sua conta profissional</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          
          <Input 
            label="Nome Completo" 
            type="text" 
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>Criar Conta</Button>
        </form>

        <p className="auth-footer">
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>
      </div>
    </div>
  )
}
