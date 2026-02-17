import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import DeliverySelector from '../components/features/Delivery/DeliverySelector'

const CartPage = () => {
  const { items, totalPrice, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [delivery, setDelivery] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleOrder = async e => {
    e.preventDefault()
    if (!items.length) return
    if (!delivery) {
      setError('Оберіть спосіб доставки')
      return
    }

    setLoading(true)
    setError('')

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user?.uid || 'guest',
        userEmail: user?.email || 'guest',
        name,
        phone,
        delivery,
        items,
        totalPrice,
        status: 'new',
        createdAt: new Date()
      })

      clearCart()
      setSuccess(true)
    } catch (err) {
      setError('Помилка оформлення замовлення. Спробуйте ще раз.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center text-white p-8'>
          <div className='text-6xl mb-4'>🍄</div>
          <h1 className='text-3xl font-bold mb-4'>Замовлення прийнято!</h1>
          <p className='text-stone-400 mb-8'>{"Ми зв'яжемося з вами найближчим часом"}</p>
          <button
            onClick={() => navigate('/')}
            className='bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition'
          >
            На головну
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black text-white pt-24 pb-16'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <h1 className='text-4xl font-bold mb-8'>🛒 Кошик</h1>

        {items.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-stone-400 text-xl mb-6'>Кошик порожній</p>
            <button
              onClick={() => navigate('/')}
              className='bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition'
            >
              Обрати товари
            </button>
          </div>
        ) : (
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Items list */}
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold mb-4'>Ваші товари</h2>
              {items.map(item => (
                <div
                  key={item.productId}
                  className='bg-stone-900 rounded-xl p-4 flex justify-between items-center border border-stone-700'
                >
                  <div>
                    <h3 className='font-semibold'>{item.productName}</h3>
                    <p className='text-stone-400 text-sm'>
                      {item.quantity} кг × {item.pricePerKg} ₴
                    </p>
                    <p className='text-amber-500 font-bold'>
                      {(item.quantity * item.pricePerKg).toFixed(0)} ₴
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className='text-stone-500 hover:text-red-400 transition text-xl'
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className='bg-stone-800 rounded-xl p-4 border border-stone-600'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-semibold'>Разом:</span>
                  <span className='text-2xl font-bold text-amber-500'>{totalPrice} ₴</span>
                </div>
              </div>
            </div>

            {/* Order form */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Оформлення</h2>
              <form onSubmit={handleOrder} className='space-y-4'>
                <input
                  type='text'
                  placeholder="Ваше ім'я"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none placeholder-stone-500'
                  required
                />
                <input
                  type='tel'
                  placeholder='Телефон'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none placeholder-stone-500'
                  required
                />

                {/* Delivery */}
                <div>
                  <p className='text-stone-300 text-sm mb-2 font-semibold'>Спосіб доставки:</p>
                  <DeliverySelector onDeliveryChange={setDelivery} />
                </div>

                {error && <p className='text-red-400 text-sm'>{error}</p>}

                {!user && (
                  <p className='text-stone-400 text-sm'>
                    💡 Увійдіть щоб зберегти історію замовлень
                  </p>
                )}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-amber-700 hover:bg-amber-600 text-white rounded-full py-4 font-bold text-lg transition disabled:opacity-50'
                >
                  {loading ? 'Оформлення...' : 'Замовити'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
