import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Feed } from './pages/Feed'
import { Jobs } from './pages/Jobs'
import { Profile } from './pages/Profile'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('biko:token')
  return token ? <>{children}</> : <Navigate to="/login" />
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        } />
        
        <Route path="/jobs" element={
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        } />
        
        <Route path="/profile/:id" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
