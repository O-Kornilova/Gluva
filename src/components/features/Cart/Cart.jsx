import { useCart } from '../../../context/CartContext'
import { useState } from 'react'

const Cart = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  console.log('Cart items:', items)
  console.log('Items length:', items.length)

  return (
    <>
      {items.length > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='fixed bottom-4 right-4 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-50 text-2xl'
        >
          🛒
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold'>
            {items.length}
          </span>
        </button>
      )}

      {isOpen && (
        <div className='fixed bottom-24 right-4 bg-white p-6 rounded-lg shadow-2xl w-80 z-50 border border-gray-200'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-bold text-lg text-black'>Кошик</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-3xl text-black hover:text-gray-600'
            >
              ×
            </button>
          </div>

          {items.map(item => (
            <div key={item.productId} className='mb-3 pb-3 border-b border-gray-200'>
              <div className='font-semibold text-black'>{item.productName}</div>
              <div className='text-sm text-gray-600'>
                {item.quantity} кг × {item.pricePerKg} ₴
              </div>
            </div>
          ))}

          <div className='font-bold text-xl mt-4 mb-4 text-black'>Всього: {totalPrice} ₴</div>

          <button
            onClick={clearCart}
            className='w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          >
            Очистити кошик
          </button>
        </div>
      )}
    </>
  )
}

export default Cart
