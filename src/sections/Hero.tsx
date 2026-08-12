import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Balloons } from '../components/Balloons'
import { Photo } from '../components/ui'
import { config, copy, photos } from '../content'
import { burst } from '../lib/celebrate'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const started = useInView(ref, { once: true, amount: 0.4 })

  // Confetti greets her when the wish scrolls into view, and can never block it.
  useEffect(() => {
    if (!started) return
    try {
      burst()
    } catch {
      // confetti is decoration
    }
  }, [started])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="snap-section relative z-10 flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: photoY }}>
        <Photo
          src={photos.hero}
          alt="The two of us with our feet up against the sky"
          eager
          className="h-full w-full"
          // Anchored low so both pairs of shoes stay in frame on wide screens.
          imgClassName="object-[50%_82%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink" />
      </motion.div>

      <Balloons />

      <motion.div
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
        style={reduced ? undefined : { y: textY, opacity: fade }}
      >
        <motion.p
          className="text-[0.7rem] tracking-[0.4em] text-blush/80 uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          {copy.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="shine mt-6 font-display text-[3.4rem] leading-[0.95] font-bold sm:text-7xl md:text-[6.5rem]"
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={started ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {copy.hero.title}
        </motion.h1>

        <motion.p
          className="mt-2 font-script text-6xl text-rose text-glow sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 1 }}
        >
          {config.herName}
        </motion.p>

        <div className="mt-10 space-y-2">
          {copy.hero.lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-display text-lg text-cream/85 italic sm:text-2xl"
              initial={{ opacity: 0, y: 18 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 + i * 0.28 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#birthday-girl"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-cream/60 uppercase"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <motion.span
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {copy.hero.scrollHint}
          <span className="h-8 w-px bg-gradient-to-b from-cream/60 to-transparent" />
        </motion.span>
      </motion.a>
    </section>
  )
}
