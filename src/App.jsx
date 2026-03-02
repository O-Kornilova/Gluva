import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SEO from './components/common/SEO/SEO'
import { Navbar, Footer } from './components/layout'
import Cart from './components/features/Cart/Cart'

const Home = lazy(() => import('./pages/Home'))
const CartPage = lazy(() => import('./pages/CartPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

const App = () => {
  return (
    <>
      <SEO title='Головна' />
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Cart />
        <Suspense fallback={<div className='flex justify-center items-center h-screen bg-black text-white'>Завантаження...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </main>
    </>
  )
}

export default App