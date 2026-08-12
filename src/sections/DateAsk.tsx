import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Eyebrow, Photo, Reveal, Section, SectionTitle } from '../components/ui'
import { config, copy, photos } from '../content'
import { heartStorm } from '../lib/celebrate'

/** The question itself, on top of the photo where I asked her. */
export function DateAsk() {
  return (
    <Section id="date">
      <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <Photo
          src={photos.dateAsk}
          alt="Him asking her out, both smiling against the sky"
          className="h-[38vh] min-h-[220px] sm:h-[62vh]"
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/50 to-transparent sm:block" />
        <div className="bg-wine/25 p-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-transparent sm:p-12">
          <Reveal>
            <Eyebrow>{copy.date.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} className="mt-4 max-w-2xl">
            <SectionTitle>{copy.date.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.2} className="mt-5 max-w-xl">
            <p className="text-sm leading-relaxed text-cream/75 sm:text-base">{copy.date.body}</p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.3} className="mt-8 text-center">
        <a
          href="#date-form"
          className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] text-blush/80 uppercase"
        >
          answer below
          <span aria-hidden>↓</span>
        </a>
      </Reveal>
    </Section>
  )
}

/** Optional extra: only rendered if a Google Form link is configured. */
function FormEmbed() {
  if (!config.googleFormUrl) return null

  return (
    <div className="mt-8">
      <iframe
        title={copy.date.formHeading}
        src={config.googleFormUrl}
        className="h-[520px] w-full rounded-2xl bg-cream"
        loading="lazy"
      />
    </div>
  )
}

const DETAILS = [
  { icon: '📅', text: copy.date.when },
  { icon: '🚗', text: copy.date.pickup },
  { icon: '🎁', text: copy.date.presentNote },
]

function Confirmation() {
  return (
    <motion.div
      className="card-glass mx-auto max-w-3xl rounded-[26px] p-5 sm:p-8"
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid items-center gap-7 sm:grid-cols-[13rem_1fr] sm:gap-9">
        <Photo
          src={photos.dateConfirmed}
          alt="The moment the date got confirmed"
          className="mx-auto aspect-[4/5] w-44 rounded-[20px] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:w-full"
        />

        <div className="text-center sm:text-left">
          <p className="font-script text-5xl text-rose text-glow">{copy.date.yesReveal}</p>

          <ul className="mt-6 space-y-4">
            {DETAILS.map((detail, i) => (
              <motion.li
                key={detail.text}
                className="flex items-start gap-3 text-left"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.22 }}
              >
                <span aria-hidden className="mt-0.5 text-lg">
                  {detail.icon}
                </span>
                <span
                  className={
                    i === 0
                      ? 'font-display text-xl font-semibold text-cream sm:text-2xl'
                      : 'text-sm leading-relaxed text-cream/75 sm:text-base'
                  }
                >
                  {detail.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

/** The answer slide: yes or no, where "no" politely stops being an option. */
export function DateForm() {
  const [answer, setAnswer] = useState<'pending' | 'refused' | 'yes'>('pending')
  const answerRef = useRef<HTMLDivElement>(null)

  const sayYes = () => {
    setAnswer('yes')
    heartStorm()
    requestAnimationFrame(() => answerRef.current?.scrollIntoView({ block: 'center' }))
  }

  return (
    <Section id="date-form">
      <Reveal className="text-center">
        <Eyebrow>{copy.date.formEyebrow}</Eyebrow>
      </Reveal>

      <div ref={answerRef} className="mt-8">
        <AnimatePresence mode="wait">
          {answer !== 'yes' ? (
            <motion.div key="question" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="card-glass mx-auto max-w-2xl rounded-[26px] p-6 text-center sm:p-10">
                <p className="text-[0.7rem] tracking-[0.2em] text-blush/70 lowercase">
                  {copy.date.formSubheading}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-cream text-balance sm:text-4xl">
                  {copy.date.question}
                </h3>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    type="button"
                    onClick={sayYes}
                    className="cursor-pointer rounded-full bg-rose px-10 py-4 text-sm font-medium tracking-[0.18em] text-cream uppercase shadow-[0_20px_60px_-20px_rgba(255,95,143,0.9)]"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copy.date.yesLabel}
                  </motion.button>

                  <AnimatePresence>
                    {answer === 'pending' && (
                      <motion.button
                        type="button"
                        onClick={() => setAnswer('refused')}
                        className="cursor-pointer rounded-full border border-cream/25 px-10 py-4 text-sm tracking-[0.18em] text-cream/70 uppercase"
                        whileHover={{ scale: 1.04, borderColor: 'rgba(255,246,240,0.45)' }}
                        whileTap={{ scale: 0.95 }}
                        exit={{ opacity: 0, scale: 0.6, y: 26, rotate: -12 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {copy.date.noLabel}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {answer === 'refused' && (
                    <motion.p
                      className="mt-7 font-display text-lg text-gold italic sm:text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.35 }}
                    >
                      {copy.date.noReply}
                    </motion.p>
                  )}
                </AnimatePresence>

                <FormEmbed />
              </div>
            </motion.div>
          ) : (
            <Confirmation key="confirmed" />
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
