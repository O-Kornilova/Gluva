import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

export default function Faq () {
  const itemsRef = useRef([])

  useEffect(() => {
    const triggers = []

    itemsRef.current.forEach(item => {
      const title = item.querySelector('.nexusItem__title')
      const content = item.querySelector('.nexusItem__content')

      gsap.set(content, { height: 0, opacity: 0 })

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(title, { color: '#000', duration: 0.4 })
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.6 }
          )
        },
        onLeaveBack: () => {
          gsap.to(title, { color: '#666', duration: 0.4 })
          gsap.to(content, { height: 0, opacity: 0, duration: 0.6 })
        }
      })
      triggers.push(trigger)
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  const items = [
    {
      number: '01',
      title: 'Чи справді гливи вирощуються без хімії?',
      text: 'Так, ми використовуємо лише натуральну сировину та екологічні технології — жодних пестицидів чи стимуляторів росту.'
    },
    {
      number: '02',
      title: 'Який у глив смак у порівнянні з іншими грибами?',
      text: 'Гливи мають ніжний, трохи горіховий присмак і соковиту текстуру, яка чудово підходить для смаження, тушкування чи грилю.'
    },
    {
      number: '03',
      title: 'Скільки часу гливи залишаються свіжими?',
      text: 'Наші гливи зберігають свіжість до 7 днів у холодильнику, адже ми збираємо їх безпосередньо перед доставкою.'
    },
    {
      number: '04',
      title: 'Чи можна гливи використовувати у дієтичному харчуванні?',
      text: 'Так, вони низькокалорійні, багаті на білок, клітковину та вітаміни групи B — ідеальні для здорового раціону.'
    },
    {
      number: '05',
      title: 'Чим гливи корисні для організму?',
      text: 'Вони підтримують імунітет, нормалізують рівень холестерину та покращують роботу серцево-судинної системи.'
    },
    {
      number: '06',
      title: 'Чи є у вас доставка свіжих глив додому?',
      text: 'Так, ми доставляємо гриби прямо з ферми до вашого столу, зберігаючи їхній смак та свіжість.'
    },
    {
      number: '07',
      title: 'Чи підходять гливи для веганських і вегетаріанських страв?',
      text: 'Абсолютно! Вони чудово замінюють м’ясо завдяки своїй текстурі й насичують страви білком.'
    },
    {
      number: '08',
      title: 'Чому варто купити саме ваші гливи?',
      text: 'Наші гливи вирощуються з любов’ю, без хімії, щодня збираються свіжими і мають відмінний смак, який оцінять усі гурмани.'
    }
  ]

  return (
    <section className='faq_section'>
      <div className='nexus'>
        <AnimatedTitle
          title='Часті питання'
          sectionId='#story'
          containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
        />
        <div className='nexus__sticky'>
          <ul className='nexusAttributes nexus__attributes'>
            {items.map((item, i) => (
              <li
                key={i}
                className='nexusItem'
                ref={el => (itemsRef.current[i] = el)}
              >
                <header className='nexusItem__header textCaption'>
                  <div className='nexusItem__number'>{item.number}</div>
                  <div className='nexusItem__title'>{item.title}</div>
                </header>
                <div className='nexusItem__content'>
                  <div className='nexusItem__contentInner'>
                    <p className='nexusItem__description textBody4'>
                      {item.text}
                    </p>
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
