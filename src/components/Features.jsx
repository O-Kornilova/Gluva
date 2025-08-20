import { useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

// ProductCard компонента
const ProductCard = ({
  src,
  title,
  description,
  pricePerKg = 120,
  isVideo = false,
  onOrder
}) => {
  const [quantity, setQuantity] = useState(0.5) // початкова кількість 500г

  // Функція для визначення типу медіа
  const detectMediaType = src => {
    if (!src) return false
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    return videoExtensions.some(ext => src.toLowerCase().includes(ext))
  }

  const shouldShowVideo = isVideo !== undefined ? isVideo : detectMediaType(src)

  // Функції для зміни кількості
  const increaseQuantity = () => {
    setQuantity(prev => prev + 0.5)
  }

  const decreaseQuantity = () => {
    if (quantity > 0.5) {
      setQuantity(prev => prev - 0.5)
    }
  }

  // Розрахунок загальної ціни
  const totalPrice = (quantity * pricePerKg).toFixed(0)

  // Функція замовлення
  const handleOrder = () => {
    const orderData = {
      title: typeof title === 'string' ? title : 'Свіжі гливи',
      quantity,
      pricePerKg,
      totalPrice: parseFloat(totalPrice)
    }

    if (onOrder) {
      onOrder(orderData)
    } else {
      alert(
        `Замовлення:\n${orderData.title}\nКількість: ${quantity} кг\nДо сплати: ${totalPrice} ₴`
      )
    }
  }

  return (
    <div className='relative size-full'>
      {shouldShowVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      ) : (
        <img
          src={src}
          alt={typeof title === 'string' ? title : 'Product image'}
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      )}

      {/* Затемнення для кращої читабельності */}
      <div className='absolute inset-0 bg-black bg-opacity-40'></div>

      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        {/* Верхня частина з назвою та описом */}
        <div>
          <h1 className='bento-title special-font'>{title}</h1>
          {description &&
            (typeof description === 'string' ? (
              <p className='mt-3 w-full text-xs md:text-base'>{description}</p>
            ) : (
              <div className='mt-3 w-full text-xs md:text-base'>
                {description}
              </div>
            ))}
        </div>

        {/* Нижня частина з ціною та контролами */}
        <div className='space-y-4'>
          {/* Ціна за кг */}
          <div className='text-right'>
            <span className='text-sm opacity-75'>{pricePerKg} ₴/кг</span>
          </div>

          {/* Контроли кількості */}
          <div className='flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm'>
            <button
              onClick={decreaseQuantity}
              className='w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={quantity <= 0.5}
            >
              −
            </button>

            <div className='text-center'>
              <div className='text-lg font-bold'>{quantity} кг</div>
              <div className='text-xs opacity-75'>{quantity * 1000} г</div>
            </div>

            <button
              onClick={increaseQuantity}
              className='w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold transition-colors'
            >
              +
            </button>
          </div>

          {/* Загальна ціна та кнопка замовлення */}
          <div className='flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm'>
            <div>
              <div className='text-lg font-bold text-green-400'>
                {totalPrice} ₴
              </div>
              <div className='text-xs opacity-75'>до сплати</div>
            </div>

            <button
              onClick={handleOrder}
              className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-white font-semibold transition-all transform hover:scale-105 active:scale-95'
            >
              Замовити
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const BentoTilt = ({ children, className = '' }) => {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef()

  const handleMouseMove = e => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (e.clientX - left) / width
    const relativeY = (e.clientX - top) / height

    const tiltX = (relativeY - 0.5) * 5
    const tiltY = (relativeX - 0.5) * -5

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = e => {
    setTransformStyle('')
  }

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

const BentoCard = ({ src, title, description, isVideo = true }) => {
  const detectMediaType = src => {
    if (!src) return false
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    return videoExtensions.some(ext => src.toLowerCase().includes(ext))
  }

  const shouldShowVideo = isVideo !== undefined ? isVideo : detectMediaType(src)

  return (
    <div className='relative size-full'>
      {shouldShowVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      ) : (
        <img
          src={src}
          alt={title || 'Bento card image'}
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      )}

      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        <div>
          <h1 className='bento-title special-font'>{title}</h1>
          {description && (
            <p className='mt-3 w-full text-xs md:text-base'>{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  const handleOrder = orderData => {
    console.log('Замовлення:', orderData)
    // Тут додам логіку відправки замовлення на сервер
    alert(
      `Дякуємо за замовлення!\n\nТовар: ${orderData.title}\nКількість: ${orderData.quantity} кг\nСума: ${orderData.totalPrice} ₴\n\nМи зв'яжемося з вами найближчим часом!`
    )
  }

  return (
    <section className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web text-lg text-blue-50'>
            смачно і корисно
          </p>
          <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
            Смачний акцент для ваших страв
          </p>
        </div>

        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
          <BentoCard
            src='img/fff.webp'
            isVideo={false}
            title={
              <>
                Фермерські <b>гливи</b>
              </>
            }
            description='Ніжні фермерські гливи для смачних і корисних страв. 
      Відкрий нові рецепти супів, закусок і гарнірів прямо на своїй кухні!'
          />
        </BentoTilt>

        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
          <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
            <BentoCard
              title={<>Гливи — більше ніж просто гриб</>}
              description={
                <div className='grid md:grid-cols-1 gap-4 text-m'>
                  {/* Білок */}
                  <div className='flex flex-col items-center bg-gray-900 rounded-xl p-3'>
                    <div className='text-3xl mb-1'>🥩</div>
                    <h3 className='font-semibold'>Багато білку</h3>
                    <p className='text-gray-400 text-xs text-center'>
                      Альтернатива м’ясу для вегетаріанців.
                    </p>
                  </div>

                  {/* Вітаміни */}
                  <div className='flex flex-col items-center bg-gray-900 rounded-xl p-3'>
                    <div className='text-3xl mb-1'>💊</div>
                    <h3 className='font-semibold'>Вітаміни B</h3>
                    <p className='text-gray-400 text-xs text-center'>
                      Підтримка нервової системи та енергія.
                    </p>
                  </div>

                  {/* Імунітет */}
                  <div className='flex flex-col items-center bg-gray-900 rounded-xl p-3'>
                    <div className='text-3xl mb-1'>🛡️</div>
                    <h3 className='font-semibold'>Сильний імунітет</h3>
                    <p className='text-gray-400 text-xs text-center'>
                      Залізо та мікроелементи для захисту організму.
                    </p>
                  </div>
                </div>
              }
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
            <ProductCard
              src='img/mushroom-recipe.jpg'
              isVideo={false}
              pricePerKg={120}
              onOrder={handleOrder}
              title={<>Свіжі гливи</>}
              description='Найсвіжіші фермерські гливи прямо до вашого столу'
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
            <ProductCard
              src='img/mushroom2.jpg'
              isVideo={false}
              pricePerKg={60}
              onOrder={handleOrder}
              title={<>Сушені гливи</>}
              description='Рішення для будь-яких несподіваних ситуацій'
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_2'>
            <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
              <h1 className='bento-title special-font w-full text-black'>
                Незабаром відкриття нашого кулінарного блогу
              </h1>
              <TiLocationArrow className='m-5 scale-[5] self-end' />
            </div>
          </BentoTilt>

          <BentoTilt className='bento-tilt_2'>
            <BentoCard src='img/cooking-process.jpg' isVideo={false} />
          </BentoTilt>
        </div>
      </div>
    </section>
  )
}

export default Features
