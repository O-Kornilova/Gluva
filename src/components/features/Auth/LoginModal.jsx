import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'

const LoginModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        await register(email, password, name)
      } else {
        await login(email, password)
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Помилка авторизації')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-stone-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-stone-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-100">
            {isRegister ? 'Реєстрація' : 'Вхід'}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-100 text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Ваше ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-800 text-stone-100 rounded-lg px-4 py-3 border border-stone-600 focus:border-amber-600 focus:outline-none placeholder-stone-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-stone-800 text-stone-100 rounded-lg px-4 py-3 border border-stone-600 focus:border-amber-600 focus:outline-none placeholder-stone-500"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-stone-800 text-stone-100 rounded-lg px-4 py-3 border border-stone-600 focus:border-amber-600 focus:outline-none placeholder-stone-500"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-lg py-3 font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Завантаження...' : isRegister ? 'Зареєструватись' : 'Увійти'}
          </button>
        </form>

        <p className="text-center text-stone-400 mt-4 text-sm">
          {isRegister ? 'Вже є акаунт?' : 'Немає акаунту?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-amber-500 hover:text-amber-400"
          >
            {isRegister ? 'Увійти' : 'Зареєструватись'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginModal
