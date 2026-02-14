const NutritionCard = () => {
  const benefits = [
    {
      icon: '🥩',
      title: 'Багато білку',
      description: "Альтернатива м'ясу для вегетаріанців."
    },
    {
      icon: '💊',
      title: 'Вітаміни B',
      description: 'Підтримка нервової системи та енергія.'
    },
    {
      icon: '🛡️',
      title: 'Сильний імунітет',
      description: 'Залізо та мікроелементи для захисту організму.'
    }
  ]

  return (
    <div className='relative size-full flex flex-col justify-between p-5 text-blue-50'>
      <div>
        <h1 className='bento-title special-font'>Гливи — більше ніж просто гриб</h1>
        <div className='grid md:grid-cols-1 gap-4 text-m mt-5'>
          {benefits.map((benefit, index) => (
            <div key={index} className='flex flex-col items-center bg-gray-900 rounded-xl p-3'>
              <div className='text-3xl mb-1'>{benefit.icon}</div>
              <h3 className='font-semibold'>{benefit.title}</h3>
              <p className='text-gray-400 text-xs text-center'>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NutritionCard
