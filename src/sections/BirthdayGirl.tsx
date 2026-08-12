import { Eyebrow, Polaroid, Reveal, Section, SectionTitle } from '../components/ui'
import { config, copy, photos } from '../content'

function Marquee() {
  const item = `happy birthday ${config.herName}`
  return (
    <div className="relative -mx-6 overflow-hidden border-y border-blush/15 py-4 sm:-mx-10">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="font-display text-2xl tracking-[0.2em] text-blush/45 uppercase sm:text-3xl"
          >
            {item} <span className="text-rose">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function BirthdayGirl() {
  return (
    <Section id="birthday-girl">
      <div className="grid items-center gap-14 md:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow>{copy.birthdayGirl.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} className="mt-5">
            <SectionTitle>{copy.birthdayGirl.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <p className="max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
              {copy.birthdayGirl.body}
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <div className="flex items-center gap-3 text-4xl">
              <span>🎂</span>
              <span className="font-script text-3xl text-gold">make a wish</span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-8">
          <Polaroid
            src={photos.cutest}
            alt="Her, on her birthday"
            caption={copy.birthdayGirl.cutestCaption}
            rotate={-4}
            className="mt-6"
          />
          <Polaroid
            src={photos.prettiest}
            alt="Her, looking prettier than ever"
            caption={copy.birthdayGirl.prettiestCaption}
            rotate={4}
          />
        </div>
      </div>

      <div className="mt-20">
        <Marquee />
      </div>
    </Section>
  )
}
