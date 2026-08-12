import { motion } from 'motion/react'
import { config, copy } from '../content'

/** Opening slide. Purely scroll-driven — nothing here has to be tapped. */
export function Intro() {
  return (
    <section
      id="intro"
      className="snap-section relative z-10 flex min-h-screen flex-col items-center justify-center gap-7 px-6 text-center"
    >
      <motion.div
        className="flex flex-col items-center gap-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="font-sans text-xs tracking-[0.4em] text-blush/70 uppercase">
          {copy.intro.kicker}
        </span>

        <motion.span
          className="text-7xl"
          animate={{ rotate: [-6, 6, -6], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎁
        </motion.span>

        <span className="font-script text-5xl text-cream text-glow sm:text-6xl">
          {config.herName}
        </span>

        <span className="text-[0.7rem] tracking-[0.18em] text-cream/40 lowercase">
          {copy.intro.hint}
        </span>
      </motion.div>

      <motion.a
        href="#hero"
        className="mt-6 flex flex-col items-center gap-3 text-[0.7rem] tracking-[0.3em] text-cream/70 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.span
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {copy.intro.cta}
          <span className="h-10 w-px bg-gradient-to-b from-cream/60 to-transparent" />
        </motion.span>
      </motion.a>
    </section>
  )
}
