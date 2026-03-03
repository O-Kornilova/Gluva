import Button from '../../common/Button/Button'
import { TiLocationArrow } from 'react-icons/ti'

const Hero = () => {
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-blue-75">
      {/* <img
        src='img/entrance.webp'
        alt='Гливи'
        className='absolute left-0 top-0 size-full object-cover object-center'
      /> */}
      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100">
            Гли<b>в</b>и
          </h1>
          <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
            Фермерські гливи <br />
            прямо до вашого столу
          </p>
          <Button
            id="order-now"
            title="Замовити"
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 flex-center gap-1"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
