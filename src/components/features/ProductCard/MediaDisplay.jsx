const MediaDisplay = ({ src, title, isVideo }) => {
  const detectMediaType = src => {
    if (!src) return false
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    return videoExtensions.some(ext => src.toLowerCase().includes(ext))
  }

  const shouldShowVideo = isVideo !== undefined ? isVideo : detectMediaType(src)

  return (
    <>
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
          alt={typeof title === 'string' ? title : 'Product image'}
          className='absolute left-0 top-0 size-full object-cover object-center'
        />
      )}
      <div className='absolute inset-0 bg-black bg-opacity-40'></div>
    </>
  )
}

export default MediaDisplay
