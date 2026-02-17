import { useState } from 'react'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from '../../../config/firebase.config'
import { useAuth } from '../../../context/AuthContext'

const LoginModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      onClose()
    } catch (err) {
      setError('Помилка входу через Google')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailAuth = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onClose()
    } catch (err) {
      setError(err.code === 'auth/wrong-password' 
        ? 'Невірний пароль' 
        : err.code === 'auth/user-not-found'
        ? 'Користувача не знайдено'
        : err.code === 'auth/email-already-in-use'
        ? 'Email вже використовується'
        : 'Помилка авторизації')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm'>
      <div className='bg-stone-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-stone-700'>
        
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-stone-100'>
            {isRegister ? 'Реєстрація' : 'Вхід'}
          </h2>
          <button onClick={onClose} className='text-stone-400 hover:text-stone-100 text-2xl'>✕</button>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className='w-full flex items-center justify-center gap-3 bg-stone-100 text-stone-900 rounded-lg py-3 font-semibold hover:bg-stone-200 transition mb-4'
        >
          <img src='https://www.google.com/favicon.ico' alt='Google' className='w-5 h-5' />
          Увійти через Google
        </button>

        <div className='flex items-center gap-3 mb-4'>
          <div className='flex-1 h-px bg-stone-700'></div>
          <span className='text-stone-500 text-sm'>або</span>
          <div className='flex-1 h-px bg-stone-700'></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full bg-stone-800 text-stone-100 rounded-lg px-4 py-3 border border-stone-600 focus:border-amber-600 focus:outline-none placeholder-stone-500'
            required
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full bg-stone-800 text-stone-100 rounded-lg px-4 py-3 border border-stone-600 focus:border-amber-600 focus:outline-none placeholder-stone-500'
            required
          />

          {error && <p className='text-red-400 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-lg py-3 font-semibold transition disabled:opacity-50'
          >
            {loading ? 'Завантаження...' : isRegister ? 'Зареєструватись' : 'Увійти'}
          </button>
        </form>

        <p className='text-center text-stone-400 mt-4 text-sm'>
          {isRegister ? 'Вже є акаунт?' : 'Немає акаунту?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className='text-amber-500 hover:text-amber-400'
          >
            {isRegister ? 'Увійти' : 'Зареєструватись'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginModal