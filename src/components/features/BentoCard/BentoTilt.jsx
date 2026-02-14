import { useBentoTilt } from '../../../hooks/useBentoTilt'

const BentoTilt = ({ children, className = '' }) => {
  const { itemRef, transformStyle, handleMouseMove, handleMouseLeave } = useBentoTilt()

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

export default BentoTilt
