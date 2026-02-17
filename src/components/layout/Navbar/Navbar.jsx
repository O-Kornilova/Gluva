import { useEffect, useRef, useState } from 'react'
import Button from '../../common/Button/Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'
import { useAuth } from '../../../context/AuthContext'
import LoginModal from '../../features/Auth/LoginModal'

const navItems = ['Купити', 'Питання', 'Контакти']

const Navbar = () => {
  const [isAudioPlaying, setisAudioPlaying] = useState(false)
  const [isIndicatorActive, setisIndicatorActive] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { user, logout, isAdmin } = useAuth()

  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)

  const { y: currentScrollY } = useWindowScroll()
const lastScrollYRef = useRef(0)

useEffect(() => {
  if (currentScrollY === 0) {
    setIsNavVisible(true)
    navContainerRef.current.classList.remove('floating-nav')
  } else if (currentScrollY > lastScrollYRef.current) {
    setIsNavVisible(false)
    navContainerRef.current.classList.add('floating-nav')
  } else if (currentScrollY < lastScrollYRef.current) {
    setIsNavVisible(true)
    navContainerRef.current.classList.add('floating-nav')
  }

  lastScrollYRef.current = currentScrollY
}, [currentScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  const toggleAudioIndicator = () => {
    setisAudioPlaying(prev => !prev)
    setisIndicatorActive(prev => !prev)
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play()
    } else {
      audioElementRef.current.pause()
    }
  }, [isAudioPlaying])

  return (
    <>
      <div
        ref={navContainerRef}
        className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
      >
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
          <nav className='flex size-full items-center justify-between p-4'>
            <div className='flex items-center gap-7'>
              <img src='/img/logo.png' alt='logo' className='w-10' />
              <Button
                id='product-button'
                title='Наші гриби'
                rightIcon={<TiLocationArrow />}
                containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
              />
            </div>

            <div className='flex h-full items-center gap-4'>
              <div className='hidden md:block'>
                {navItems.map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                    {item}
                  </a>
                ))}
              </div>

              {/* Auth кнопки */}
              {user ? (
                <div className='flex items-center gap-3'>
                  {isAdmin && (
                    <a href='/admin' className='text-yellow-400 text-sm font-semibold hover:text-yellow-300'>
                      Адмін
                    </a>
                  )}
                  <span className='text-blue-50 text-sm hidden md:block'>
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={logout}
                    className='text-blue-50 text-sm hover:text-blue-300 transition'
                  >
                    Вийти
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className='text-blue-50 text-sm hover:text-blue-300 transition font-semibold'
                >
                  Увійти
                </button>
              )}

              <button className='ml-4 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                {[1, 2, 3, 4].map(bar => (
                  <div
                    key={bar}
                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  )
}

export default Navbar