import { useEffect } from 'react'
import { Ambience } from './components/Ambience'
import { ScrollProgress } from './components/ScrollProgress'
import { BirthdayGirl } from './sections/BirthdayGirl'
import { DateAsk, DateForm } from './sections/DateAsk'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Outro } from './sections/Outro'
import { Sassiest } from './sections/Sassiest'
import { Together } from './sections/Together'

export default function App() {
  // A reload should always land back on the first slide, never halfway down the story.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="grain relative">
      <Ambience />
      <ScrollProgress />

      <main>
        <Intro />
        <Hero />
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
