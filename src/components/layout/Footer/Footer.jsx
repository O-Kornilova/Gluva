// Footer — підвал сайту.
// Оригінальний мав Discord/Twitter/YouTube — це залишки Zentry-клону.
// Замінюємо на контакти реального магазину грибів.

const Footer = () => {
  return (
    <footer className='w-screen bg-black py-8 border-t border-stone-800'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row'>

        {/* Логотип і назва */}
        <div className='flex items-center gap-3'>
          <img src='/img/logo.png' alt='Глива' className='w-8 h-8 object-contain' />
          <span className='text-stone-400 text-sm font-light'>© 2025 Глива. Всі права захищено.</span>
        </div>

        {/* Контакти */}
        <div className='flex flex-col items-center gap-1 md:items-end'>
          <a
            href='tel:+380991234567'
            className='text-stone-400 text-sm hover:text-amber-500 transition'
          >
            +38 (099) 123-45-67
          </a>
          <a
            href='mailto:gluva.farm@gmail.com'
            className='text-stone-400 text-sm hover:text-amber-500 transition'
          >
            gluva.farm@gmail.com
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
