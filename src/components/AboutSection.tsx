import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [futureDate, setFutureDate] = useState<string>('')

  useEffect(() => {
    const today = new Date('2025-06-09')
    const future = new Date(today)
    future.setDate(today.getDate() + 10)
    const formattedDate = future.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    setFutureDate(formattedDate)
  }, [])

  useEffect(() => {
    if (textRef.current) {
      const elements = Array.from(textRef.current.children)

      const ctx = gsap.context(() => {
        gsap.from(elements, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: 'bounce.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        })
      }, textRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className='min-h-screen bg-cream-200 flex flex-col items-center justify-start relative'
    >
      <div className='w-full text-black overflow-hidden whitespace-nowrap h-64 relative flex items-center max-h-[200px]'>
        <div
          className='absolute w-max animate-marquee-text'
          style={{ transform: 'translateY(-15px)' }}
        >
          <span className='inline-block'>
            Свіженький зріз планується {futureDate} - Свіженький зріз планується{' '}
            {futureDate} -
          </span>
        </div>
      </div>

      <div ref={textRef} className='max-w-4xl text-center mt-8 p-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-green-900'>
          Про нашу ферму
        </h2>
        <p className='mt-4 text-lg text-brown-800'>
          Ми вирощуємо екологічно чисті гливи на власній фермі, використовуючи
          лише натуральні матеріали. Наша місія – принести свіжість і смак
          природи до вашого столу.
        </p>
        <p className='mt-4 text-lg text-brown-800'>
          Кожна глива вирощена з любов’ю та турботою, щоб забезпечити найвищу
          якість.
        </p>
      </div>
    </section>
  )
}

export default AboutSection
