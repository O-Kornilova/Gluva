import { useState } from 'react'
import { useCart } from '../../../context/CartContext'
import MediaDisplay from './MediaDisplay'
import QuantityControl from './QuantityControl'
import PriceDisplay from './PriceDisplay'

const ProductCard = ({ src, title, description, pricePerKg = 120, isVideo = false }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(0.5)

  const increaseQuantity = () => {
    setQuantity(prev => prev + 0.5)
  }

  const decreaseQuantity = () => {
    if (quantity > 0.5) {
      setQuantity(prev => prev - 0.5)
    }
  }

  const totalPrice = (quantity * pricePerKg).toFixed(0)

  const handleOrder = () => {
    const product = { id: title, name: title, pricePerKg }
    addToCart(product, quantity)
    alert(`Додано в кошик: ${quantity} кг`)
  }

  return (
    <div className='relative size-full'>
      <MediaDisplay src={src} title={title} isVideo={isVideo} />

      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        <div>
          <h1 className='bento-title special-font'>{title}</h1>
          {description && (
            <p className='mt-3 max-w-64 text-xs md:text-base opacity-90'>{description}</p>
          )}
        </div>

        <div className='space-y-4'>
          <PriceDisplay totalPrice={totalPrice} pricePerKg={pricePerKg} />

          <QuantityControl
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />

          <button
            onClick={handleOrder}
            className='w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-white font-semibold transition-all transform hover:scale-105 active:scale-95'
          >
            Замовити
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
