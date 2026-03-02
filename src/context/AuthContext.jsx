import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase.config'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = () => signOut(auth)

  const value = {
    user,
    loading,
    logout,
    isAdmin: user?.email === 'aleksandra.kopachovets.ne@gmail.com',
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-black'>
        <div className='text-white text-xl'>Завантаження...</div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}