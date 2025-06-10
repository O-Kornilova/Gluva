import React, { useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  phone?: string
  quantity: string
}

// Компонент для форми замовлення з паралакс-анімацією
const OrderForm: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )
    }
  }, [])

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await fetch('https://formspree.io/f/mdkgqrkp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        alert('Замовлення надіслано!')
      } else {
        alert('Помилка при відправці.')
      }
    } catch (error) {
      alert('Помилка мережі.')
    }
  }

  return (
    <section
      ref={sectionRef}
      className='min-h-screen bg-cream-200 flex items-center justify-center p-4'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-md w-full'>
        <h2 className='text-3xl md:text-4xl font-bold text-green-900 text-center mb-8'>
          Попереднє замовлення
        </h2>
        <div className='mb-4'>
          <input
            {...register('name', { required: 'Введіть ім’я' })}
            placeholder='Ім’я'
            className='w-full p-2 text-green-900 border border-green-900 rounded'
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </div>
        <div className='mb-4'>
          <input
            {...register('email', {
              required: 'Введіть email',
              pattern: { value: /^\S+@\S+$/i, message: 'Невірний email' }
            })}
            placeholder='Email'
            className='w-full p-2 text-green-900 border border-green-900 rounded'
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        <div className='mb-4'>
          <input
            {...register('phone')}
            placeholder='Телефон (опціонально)'
            className='w-full p-2 text-green-900 border border-green-900 rounded'
          />
        </div>
        <div className='mb-4'>
          <input
            {...register('quantity', {
              required: 'Введіть кількість',
              pattern: { value: /^[0-9]+$/, message: 'Тільки цифри' }
            })}
            placeholder='Кількість (кг)'
            className='w-full p-2 text-green-900 border border-green-900 rounded'
          />
          {errors.quantity && (
            <span className='text-red-500'>{errors.quantity.message}</span>
          )}
        </div>
        <button
          type='submit'
          className='w-full bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 transition'
        >
          Надіслати замовлення
        </button>
      </form>
    </section>
  )
}

export default OrderForm
