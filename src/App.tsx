import { useEffect, useState } from 'react'
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

  return (
    <div className="grain relative">
      <Ambience />
      <ScrollProgress />
      <Gate
        open={opened}
        onOpen={() => {
          setOpened(true)
          burst()
        }}
      />

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
