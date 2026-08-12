import { useEffect, useState } from 'react'

/** True on tablet-and-up. Used to keep scroll-linked parallax off phones. */
export function useIsWide() {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 768px)').matches)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => setWide(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return wide
}
