import { motion, useReducedMotion } from 'motion/react'
import { Eyebrow, Photo, Reveal, Section, SectionTitle } from '../components/ui'
import { copy, photos } from '../content'

function SassCard({
  src,
  alt,
  label,
  from,
  delay,
}: {
  src: string
  alt: string
  label: string
  from: number
  delay: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="group relative overflow-hidden rounded-[22px]"
      initial={{ opacity: 0, x: reduced ? 0 : from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Photo
        src={src}
        alt={alt}
        className="h-[32vh] min-h-[200px] sm:h-[46vh]"
        imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-script text-3xl text-cream sm:text-4xl">{label}</p>
      </div>
    </motion.div>
  )
}

export function Sassiest() {
  return (
    <Section id="sassiest">
      <div className="text-center">
        <Reveal>
          <Eyebrow>{copy.sassiest.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1} className="mt-5">
          <SectionTitle>{copy.sassiest.title}</SectionTitle>
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl">
          <p className="text-base leading-relaxed text-cream/70 sm:text-lg">{copy.sassiest.body}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <SassCard
          src={photos.sassiestBoy}
          alt="Him, being dramatic"
          label={copy.sassiest.boy}
          from={-70}
          delay={0}
        />

        <Reveal delay={0.35} className="flex justify-center">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-rose/90 text-2xl shadow-[0_0_50px_rgba(255,95,143,0.6)]"
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            💘
          </motion.div>
        </Reveal>

        <SassCard
          src={photos.sassiestGirl}
          alt="Her, out-sassing him"
          label={copy.sassiest.girl}
          from={70}
          delay={0.15}
        />
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <p className="font-display text-xl text-gold italic sm:text-2xl">{copy.sassiest.verdict}</p>
      </Reveal>
    </Section>
  )
}
