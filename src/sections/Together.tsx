import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Eyebrow, Photo, Reveal, Section, SectionTitle } from '../components/ui'
import { copy, photos } from '../content'

function Gallery() {
  const reduced = useReducedMotion()
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {photos.us.map((src, i) => (
        <motion.div
          key={src}
          className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
          initial={{ opacity: 0, y: reduced ? 0 : 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduced ? undefined : { scale: 1.04, rotate: i % 2 ? 1.5 : -1.5 }}
        >
          <Photo src={src} alt="A day of ours" className="aspect-square" />
        </motion.div>
      ))}
    </div>
  )
}

export function Together() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <Section id="together">
      <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1fr]">
        <div ref={ref} className="relative mx-auto w-full max-w-sm">
          <motion.div style={reduced ? undefined : { y }}>
            <Photo
              src={photos.together}
              alt="The two of us in the mall mirrors"
              className="h-[62vh] min-h-[360px] rounded-[26px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
          <motion.div
            className="absolute -top-5 -left-5 text-4xl"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            💞
          </motion.div>
        </div>

        <div>
          <Reveal>
            <Eyebrow>{copy.together.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} className="mt-5">
            <SectionTitle>{copy.together.title}</SectionTitle>
          </Reveal>
          <div className="mt-7 space-y-3">
            {copy.together.lines.map((line, i) => (
              <Reveal key={line} delay={0.16 + i * 0.12}>
                <p className="max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Reveal className="mb-6 text-center">
          <p className="font-script text-4xl text-blush">{copy.together.galleryTitle}</p>
        </Reveal>
        <Gallery />
      </div>
    </Section>
  )
}
