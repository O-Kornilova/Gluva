import React from 'react'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import FAQSection from './components/FAQSection'
import OrderForm from './components/OrderForm'

const App: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FAQSection />
      <OrderForm />
    </div>
  )
}

export default App
