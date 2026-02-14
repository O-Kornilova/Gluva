const BentoCard = ({ src, title, description, isVideo = true }) => {
  const detectMediaType = src => {
    if (!src) return false
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    return videoExtensions.some(ext => src.toLowerCase().includes(ext))
  }

  const shouldShowVideo = isVideo !== undefined ? isVideo : detectMediaType(src)

  return (
    <div className='relative size-full'>
      {shouldShowVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      ) : (
        <img
          src={src}
          alt={title || 'Bento card image'}
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      )}

      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        <div>
          <h1 className='bento-title special-font'>{title}</h1>
          {description && <div className='mt-3 w-full text-xs md:text-base'>{description}</div>}
        </div>
      </div>
    </div>
  )
}

export default BentoCard
