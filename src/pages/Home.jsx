import { lazy, Suspense } from 'react'

// lazy() — це React-функція для відкладеного завантаження компонентів.
// Компонент підвантажиться тільки коли він потрібен, а не одразу з усім сайтом.
// Це покращує початковий час завантаження (Lighthouse score).
const Hero = lazy(() => import('../components/sections/Hero/Hero'))
const About = lazy(() => import('../components/sections/About/About'))
const Story = lazy(() => import('../components/sections/Story/Story'))
const Features = lazy(() => import('../components/sections/Features/Features'))
const FAQ = lazy(() => import('../components/sections/FAQ/Faq'))
const Contact = lazy(() => import('../components/sections/Contact/Contact'))

const Home = () => {
  return (
    <Suspense fallback={<div className='flex justify-center items-center h-screen bg-black text-white'>Завантаження...</div>}>
      <Hero />
      <About />
      <Story />
      <Features />
      <FAQ />
      <Contact />
    </Suspense>
  )
}

export default Home