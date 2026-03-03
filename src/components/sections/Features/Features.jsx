import { TiLocationArrow } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import BentoTilt from '../../features/BentoCard/BentoTilt'
import BentoCard from '../../features/BentoCard/BentoCard'
import NutritionCard from '../../features/NutritionCard/NutritionCard'
import ProductCard from '../../features/ProductCard/ProductCard'
import { productsApi } from '../../../services/api'

const Features = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll()
        console.log('Товари отримані:', data)
        setProducts(data)
      } catch (error) {
        console.error('Помилка:', error)
      } finally {
        setLoading(false)
        console.log('Loading завершено')
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">смачно і корисно</p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Смачний акцент для ваших страв
          </p>
        </div>

        {/* Hero Banner */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="img/fff.webp"
            isVideo={false}
            title={<>Фермерські гливи</>}
            description="Ніжні фермерські гливи для смачних і корисних страв. Відкрий нові рецепти супів, закусок і гарнірів прямо на своїй кухні!"
          />
        </BentoTilt>

        {/* Grid */}
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 auto-rows-auto gap-5">
          {/* Nutrition Benefits */}
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <NutritionCard />
          </BentoTilt>

          {/* Товари з API */}
          {loading ? (
            <>
              <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1">
                <div className="size-full bg-stone-900 animate-pulse rounded-md" />
              </BentoTilt>
              <BentoTilt className="bento-tilt_1 md:col-span-1">
                <div className="size-full bg-stone-900 animate-pulse rounded-md" />
              </BentoTilt>
            </>
          ) : (
            products.map((product) => (
              <BentoTilt key={product.id} className="bento-tilt_1 row-span-1 md:col-span-1">
                <ProductCard
                  src={product.imageUrl || 'img/mushroom-recipe.jpg'}
                  isVideo={false}
                  pricePerKg={product.pricePerKg}
                  title={<>{product.name}</>}
                  description={product.description || ''}
                  productId={product.id}
                />
              </BentoTilt>
            ))
          )}

          {/* Coming Soon */}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-center bg-violet-300 p-5">
              <h1 className="bento-title special-font w-full text-black">
                Незабаром відкриття нашої кулінарної сторінки
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          {/* Cooking Process */}
          <BentoTilt className="bento-tilt_2">
            <BentoCard src="img/cooking-process.jpg" isVideo={false} />
          </BentoTilt>
        </div>
      </div>
    </section>
  )
}

export default Features
