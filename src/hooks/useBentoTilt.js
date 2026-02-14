import { useState, useRef } from 'react'

export const useBentoTilt = () => {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef()

  const handleMouseMove = e => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (e.clientX - left) / width
    const relativeY = (e.clientY - top) / height

    const tiltX = (relativeY - 0.5) * 5
    const tiltY = (relativeX - 0.5) * -5

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('')
  }

  return {
    itemRef,
    transformStyle,
    handleMouseMove,
    handleMouseLeave
  }
}
