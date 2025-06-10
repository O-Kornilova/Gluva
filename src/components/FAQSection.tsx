import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Як ви вирощуєте гливи?',
    answer: 'Ми використовуємо органічні субстрати...'
  },
  { question: 'Який термін доставки?', answer: 'Доставка протягом 1-2 днів.' },
  { question: 'Чи є знижки?', answer: 'Так, для замовлень від 5 кг.' }
]

const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // useEffect(() => {
  //   if (titleRef.current) {
  //     console.log('Title ref attached:', titleRef.current)
  //     gsap.from(titleRef.current, {
  //       y: -30,
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: 'power2.out',
  //       scrollTrigger: {
  //         trigger: titleRef.current,
  //         start: 'top 90%'
  //       }
  //     })
  //   }
  // }, [])

  const toggleFAQ = (index: number) => {
    const answerEl = answerRefs.current[index]
    if (!answerEl) return

    if (openIndex === index) {
      gsap.to(answerEl, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
      setOpenIndex(null)
    } else {
      if (openIndex !== null && answerRefs.current[openIndex]) {
        gsap.to(answerRefs.current[openIndex]!, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
      gsap.fromTo(
        answerEl,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      setOpenIndex(index)
    }
  }

  return (
    <section
      ref={sectionRef}
      className='min-h-screen bg-green-800 text-white flex items-center justify-center p-4'
    >
      <div className='max-w-4xl w-full'>
        <h2
          ref={titleRef}
          className='text-3xl md:text-4xl font-bold text-center mb-8 text-white'
        >
          Часті питання
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className='mb-4'>
            <button
              onClick={() => toggleFAQ(index)}
              className='w-full text-left p-4 bg-cream-200 text-green-900 rounded flex justify-between items-center'
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span
                className='transform transition-transform duration-300'
                style={{
                  display: 'inline-block',
                  transform:
                    openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
              >
                +
              </span>
            </button>

            <div
              ref={el => (answerRefs.current[index] = el)}
              style={{
                height: 0,
                opacity: 0,
                overflow: 'hidden'
              }}
            >
              <div className='p-4 bg-cream-200 text-brown-800'>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection
