import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection: React.FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (h1Ref.current) {
        gsap.fromTo(
          h1Ref.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: h1Ref.current,
              start: 'top bottom',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      if (pRef.current) {
        gsap.fromTo(
          pRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: pRef.current,
              start: 'top bottom',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 1,
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top bottom',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className='min-h-screen bg-green-800 text-white flex flex-col md:flex-row items-center justify-center gap-8 p-8'>
      <img
        src='/mushroom.webp'
        alt='Oyster Mushroom'
        className='w-2/3 md:w-1/3 max-w-sm'
      />
      <div className='text-center md:text-left max-w-xl'>
        <p ref={pRef} className='text-lg md:text-xl mb-4'>
          Смак природи у кожному шматочку!
        </p>
        <h1 ref={h1Ref} className='text-4xl md:text-5xl font-bold mb-6'>
          Свіжі гливи з нашої ферми
        </h1>
        <button
          ref={buttonRef}
          className='bg-cream-200 text-green-900 px-6 py-2 rounded hover:bg-cream-300 transition flex items-center justify-center'
        >
          Замовити зараз
        </button>
      </div>
    </section>
  )
}

export default HeroSection
