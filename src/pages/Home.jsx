import { lazy, Suspense } from 'react'

const About = lazy(() => import('../components/sections/About/About'))
const Features = lazy(() => import('../components/sections/Features/Features'))
const FAQ = lazy(() => import('../components/sections/FAQ/Faq'))
const Contact = lazy(() => import('../components/sections/Contact/Contact'))

const Home = () => {
  return (
    <Suspense fallback={<div className='flex justify-center items-center h-screen bg-black text-white'>Завантаження...</div>}>
      <About />
      <Features />
      <FAQ />
      <Contact />
    </Suspense>
  )
}

export default Home