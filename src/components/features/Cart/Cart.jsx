import { useCart } from '../../../context/CartContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleGoToCart = () => {
    setIsOpen(false)
    navigate('/cart')
  }

  return (
    <>
      {items.length > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='fixed bottom-4 right-4 bg-amber-700 text-white w-16 h-16 rounded-full shadow-lg hover:bg-amber-600 flex items-center justify-center z-50 text-2xl transition'
        >
          🛒
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold'>
            {items.length}
          </span>
        </button>
      )}

      {isOpen && (
        <div className='fixed bottom-24 right-4 bg-stone-900 p-6 rounded-2xl shadow-2xl w-80 z-50 border border-stone-700'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-bold text-lg text-white'>Кошик</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-3xl text-stone-400 hover:text-white transition'
            >
              ×
            </button>
          </div>

          <div className='max-h-48 overflow-y-auto space-y-3 mb-4'>
            {items.map(item => (
              <div key={item.productId} className='pb-3 border-b border-stone-700'>
                <div className='font-semibold text-white'>{item.productName}</div>
                <div className='text-sm text-stone-400'>
                  {item.quantity} кг × {item.pricePerKg} ₴
                </div>
                <div className='text-amber-500 font-semibold'>
                  {(item.quantity * item.pricePerKg).toFixed(0)} ₴
                </div>
              </div>
            ))}
          </div>

          <div className='font-bold text-xl mb-4 text-white'>
            Всього: <span className='text-amber-500'>{totalPrice} ₴</span>
          </div>

          <div className='space-y-2'>
            <button
              onClick={handleGoToCart}
              className='w-full bg-amber-700 hover:bg-amber-600 text-white px-4 py-3 rounded-full font-semibold transition'
            >
              Оформити замовлення
            </button>
            <button
              onClick={clearCart}
              className='w-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white px-4 py-2 rounded-full text-sm transition'
            >
              Очистити кошик
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
