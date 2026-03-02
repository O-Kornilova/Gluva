import { useRef } from 'react'
import gsap from 'gsap'
import AnimatedTitle from '../../common/AnimatedTitle/AnimatedTitle'

export default function Faq() {
  const itemsRef = useRef([])

  const handleMouseEnter = (index) => {
    const item = itemsRef.current[index]
    if (!item) return

    const title = item.querySelector('.nexusItem__title')
    const content = item.querySelector('.nexusItem__content')

    gsap.to(title, { color: '#000', duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(
      content,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' },
    )
  }

  const handleMouseLeave = (index) => {
    const item = itemsRef.current[index]
    if (!item) return

    const title = item.querySelector('.nexusItem__title')
    const content = item.querySelector('.nexusItem__content')

    gsap.to(title, { color: '#666', duration: 0.3, ease: 'power2.out' })
    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
  }

  const items = [
    {
      number: '01',
      title: 'Чи справді гливи вирощуються без хімії?',
      text: 'Так, ми використовуємо лише натуральну сировину та екологічні технології — жодних пестицидів чи стимуляторів росту.',
    },
    {
      number: '02',
      title: 'Який у глив смак у порівнянні з іншими грибами?',
      text: 'Гливи мають ніжний, трохи горіховий присмак і соковиту текстуру, яка чудово підходить для смаження, тушкування чи грилю.',
    },
    {
      number: '03',
      title: 'Скільки часу гливи залишаються свіжими?',
      text: 'Наші гливи зберігають свіжість до 7 днів у холодильнику, адже ми збираємо їх безпосередньо перед доставкою.',
    },
    {
      number: '04',
      title: 'Чи можна гливи використовувати у дієтичному харчуванні?',
      text: 'Так, вони низькокалорійні, багаті на білок, клітковину та вітаміни групи B — ідеальні для здорового раціону.',
    },
    {
      number: '05',
      title: 'Чим гливи корисні для організму?',
      text: 'Вони підтримують імунітет, нормалізують рівень холестерину та покращують роботу серцево-судинної системи.',
    },

    {
      number: '06',
      title: 'Чи підходять гливи для веганських і вегетаріанських страв?',
      text: 'Абсолютно! Вони чудово замінюють мясо завдяки своїй текстурі й насичують страви білком.',
    },
  ]

  return (
    <section className="faq_section">
      <div className="nexus">
        {/* Заголовок */}
        <div className="nexus__header">
          <AnimatedTitle title="Часті питання" sectionId="#faq" containerClass="faq-title" />
        </div>

        {/* Список питань */}
        <div className="nexus__content">
          <ul className="nexusAttributes">
            {items.map((item, i) => (
              <li
                key={i}
                className="nexusItem"
                ref={(el) => (itemsRef.current[i] = el)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <header className="nexusItem__header">
                  <div className="nexusItem__number">{item.number}</div>
                  <div className="nexusItem__title">{item.title}</div>
                </header>
                <div className="nexusItem__content">
                  <div className="nexusItem__contentInner">
                    <p className="nexusItem__description">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
