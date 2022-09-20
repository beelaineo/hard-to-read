import { useState, useEffect, useRef } from 'react'

interface ViewportSize {
  width: number
  height: number
}

interface UseViewportArgs {
  debounce?: number
}

export const useViewportSize = (args?: UseViewportArgs): ViewportSize => {
  const debounce = args?.debounce ?? 400
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1800
  const initialHeight =
    typeof window !== 'undefined' ? window.innerHeight : 1000
  const [width, setCurrentWidth] = useState<number>(initialWidth)
  const [height, setCurrentHeight] = useState<number>(initialHeight)

  const updateWidth = () => {
    setCurrentWidth(window.innerWidth)
    setCurrentHeight(window.innerHeight)
  }

  useEffect(() => {
    function handleResize() {
      updateWidth()
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.addEventListener('resize', updateWidth)
    }, debounce)

    return () => {
      window.removeEventListener('resize', updateWidth)
      clearTimeout(timeout)
    }
  }, [width, height])

  return {
    width,
    height,
  }
}
