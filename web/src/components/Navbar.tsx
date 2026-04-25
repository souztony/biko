import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Home, Briefcase, User } from 'lucide-react'
import './Navbar.css'

export function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('biko:user') || '{}')

  function handleLogout() {
    localStorage.removeItem('biko:token')
    localStorage.removeItem('biko:user')
    navigate('/login')
  }

  return (
    <nav className="navbar glass">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">Biko 🚀</Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-item">
            <Home size={20} />
            <span>Feed</span>
          </Link>
          <Link to="/jobs" className="nav-item">
            <Briefcase size={20} />
            <span>Vagas</span>
          </Link>
          <Link to={`/profile/${user.id}`} className="nav-item">
            <User size={20} />
            <span>Perfil</span>
          </Link>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  )
}
