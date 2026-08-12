import { useEffect, useState } from 'react'
import { photos } from '../content'

const ALL_PHOTOS = [
  photos.hero,
  photos.cutest,
  photos.prettiest,
  photos.sassiestBoy,
  photos.sassiestGirl,
  photos.together,
  photos.dateAsk,
  photos.dateConfirmed,
  ...photos.us,
]

/** Never make her stare at a loader because of one slow request. */
const MAX_WAIT_MS = 9000

/**
 * Fetches and decodes every photo up front. Decoding a 1600px image while she is
 * mid-scroll is what made the slides feel sluggish, so all of it happens here instead.
 */
export function usePreloadPhotos() {
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let count = 0

    const done = () => {
      if (cancelled) return
      count += 1
      setLoaded(count)
      if (count >= ALL_PHOTOS.length) setReady(true)
    }

    for (const src of ALL_PHOTOS) {
      const img = new Image()
      img.onload = done
      img.onerror = done
      img.src = src
      // decode() keeps the first paint of each slide off the main thread later
      void img.decode?.().catch(() => {})
    }

    const timeout = setTimeout(() => {
      if (!cancelled) setReady(true)
    }, MAX_WAIT_MS)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  return { progress: loaded / ALL_PHOTOS.length, ready }
}
