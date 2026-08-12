import { useEffect } from 'react'
import { Ambience } from './components/Ambience'
import { Loader } from './components/Loader'
import { ScrollProgress } from './components/ScrollProgress'
import { BirthdayGirl } from './sections/BirthdayGirl'
import { DateAsk, DateForm } from './sections/DateAsk'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Outro } from './sections/Outro'
import { Sassiest } from './sections/Sassiest'
import { Together } from './sections/Together'
import { usePreloadPhotos } from './lib/usePreloadPhotos'

export default function App() {
  const { progress, ready } = usePreloadPhotos()

  // A reload should always land back on the first slide, never halfway down the story.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Hold the page still while the photos land, then hand her a story that never stutters.
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return (
    <div className="grain relative">
      <Ambience />
      <ScrollProgress />
      <Loader show={!ready} progress={progress} />

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
