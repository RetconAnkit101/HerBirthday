import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Fades and lifts its children the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 34, className }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

type PhotoProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

/** Photo with a blush shimmer placeholder so nothing pops in as a hard rectangle. */
export function Photo({ src, alt, className = '', imgClassName = '', eager = false }: PhotoProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-wine/40 ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-wine/60 via-rose/20 to-wine/60" />}
      <img
        src={src}
        alt={alt}
        // Everything is preloaded before the story starts, so nothing is lazy here:
        // lazy loading is what made each slide stutter as it came into view.
        loading="eager"
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
          loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}

/** A photo in a tilted polaroid frame with a handwritten caption. */
export function Polaroid({
  src,
  alt,
  caption,
  rotate = -3,
  className = '',
  eager = false,
}: PhotoProps & { caption: string; rotate?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.figure
      className={`relative w-full rounded-[14px] bg-cream p-3 pb-14 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: reduced ? 0 : rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { rotate: 0, scale: 1.03, y: -8 }}
    >
      <Photo src={src} alt={alt} eager={eager} className="aspect-[4/5] rounded-[6px]" />
      <figcaption className="absolute bottom-4 left-0 w-full px-4 text-center font-script text-2xl text-ink/80">
        {caption}
      </figcaption>
    </motion.figure>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.42em] text-blush/70 uppercase">
      <span className="h-px w-8 bg-blush/40" />
      {children}
    </span>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-4xl leading-[1.05] font-semibold text-cream text-balance sm:text-5xl md:text-6xl">
      {children}
    </h2>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`snap-section relative z-10 flex min-h-screen flex-col justify-center px-6 py-20 sm:px-10 sm:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
