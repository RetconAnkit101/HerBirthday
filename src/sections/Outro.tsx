import { motion } from 'motion/react'
import { Reveal } from '../components/ui'
import { config, copy } from '../content'
import { burst } from '../lib/celebrate'

export function Outro() {
  return (
    <footer className="snap-section relative z-10 flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 text-center">
      <Reveal>
        <p className="font-display text-3xl leading-tight text-cream text-balance sm:text-5xl">
          {copy.outro.line}
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="font-script text-5xl text-rose text-glow">{config.yourName}</p>
        <p className="mt-2 text-[0.7rem] tracking-[0.3em] text-cream/45 uppercase">
          {copy.outro.signature}
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <motion.button
          type="button"
          onClick={burst}
          className="cursor-pointer rounded-full border border-blush/35 px-7 py-3 text-xs tracking-[0.22em] text-cream/80 uppercase"
          whileHover={{ scale: 1.05, borderColor: 'rgba(255,95,143,0.8)' }}
          whileTap={{ scale: 0.96 }}
        >
          one more confetti 🎉
        </motion.button>
      </Reveal>
    </footer>
  )
}
