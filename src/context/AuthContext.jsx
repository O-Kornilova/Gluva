import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // При старті додатку перевіряємо чи є збережений токен.
  // Якщо є — робимо запит /auth/me щоб отримати дані юзера.
  // Це замінює Firebase onAuthStateChanged.
  useEffect(() => {
    const token = localStorage.getItem('gluva_token')
    if (!token) {
      setLoading(false)
      return
    }

    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => {
        // Токен протух або невалідний — очищаємо
        localStorage.removeItem('gluva_token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const data = await authApi.login({ email, password })
    localStorage.setItem('gluva_token', data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (email, password, name) => {
    const data = await authApi.register({ email, password, name })
    localStorage.setItem('gluva_token', data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('gluva_token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.isAdmin === true,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-white text-xl">Завантаження...</div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
