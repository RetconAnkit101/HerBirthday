import { useCallback, useEffect, useRef, useState } from 'react'
import { Ambience } from './components/Ambience'
import { ScrollProgress } from './components/ScrollProgress'
import { BirthdayGirl } from './sections/BirthdayGirl'
import { DateAsk, DateForm } from './sections/DateAsk'
import { Gate } from './sections/Gate'
import { Hero } from './sections/Hero'
import { Outro } from './sections/Outro'
import { Sassiest } from './sections/Sassiest'
import { Together } from './sections/Together'
import { burst } from './lib/celebrate'

export default function App() {
  const [opened, setOpened] = useState(false)
  const openedRef = useRef(false)

  // Idempotent: tap, touch and scroll can all race here, and confetti must never
  // be able to swallow the reveal, so it runs after the state has committed.
  const openGate = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    setOpened(true)
    requestAnimationFrame(() => {
      try {
        burst()
      } catch {
        // confetti is decoration; losing it is fine
      }
    })
  }, [])

  // A reload should always land back on the gate, never halfway down the story.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Keep the page still until she opens the "gift", so the hero lands as a reveal.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  // Because the page is scroll-locked, treat any attempt to scroll or type as
  // "let me in" too. Without this a missed tap leaves her on a dead screen.
  useEffect(() => {
    if (opened) return
    window.addEventListener('wheel', openGate, { passive: true })
    window.addEventListener('touchmove', openGate, { passive: true })
    window.addEventListener('keydown', openGate)
    return () => {
      window.removeEventListener('wheel', openGate)
      window.removeEventListener('touchmove', openGate)
      window.removeEventListener('keydown', openGate)
    }
  }, [opened, openGate])

  return (
    <div className="grain relative">
      <Ambience />
      <ScrollProgress />
      <Gate open={opened} onOpen={openGate} />

      <main>
        <Hero started={opened} />
        <BirthdayGirl />
        <Sassiest />
        <Together />
        <DateAsk />
        <DateForm />
        <Outro />
      </main>
    </div>
  )
}
