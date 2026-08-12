import { useMemo } from 'react'
import { useIsWide } from '../lib/useMedia'

const FLOATERS = ['💗', '✨', '🌸', '💫']

/** Fixed background: warm gradient blobs plus hearts drifting up the screen. */
export function Ambience() {
  const wide = useIsWide()
  // Each floater is its own animated layer, so phones get a lighter sky.
  const count = wide ? 14 : 6

  const floaters = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        glyph: FLOATERS[i % FLOATERS.length],
        left: `${(i * 7.3 + (i % 3) * 5) % 96}%`,
        size: 10 + ((i * 5) % 12),
        duration: 20 + ((i * 5) % 16),
        delay: -((i * 3) % 24),
        drift: `${((i % 5) - 2) * 5}vw`,
        spin: `${((i % 4) - 2) * 90}deg`,
        opacity: 0.14 + ((i % 4) * 0.07),
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full bg-rose/25 blur-[60px] sm:blur-[130px]" />
      <div className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-wine/40 blur-[60px] sm:blur-[130px]" />
      <div className="absolute -bottom-52 left-1/4 hidden h-[38rem] w-[38rem] rounded-full bg-gold/15 blur-[140px] sm:block" />

      {floaters.map((f) => (
        <span
          key={f.id}
          className="floaty absolute bottom-0 select-none"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ['--drift' as string]: f.drift,
            ['--spin' as string]: f.spin,
            ['--peak-opacity' as string]: f.opacity,
          }}
        >
          {f.glyph}
        </span>
      ))}
    </div>
  )
}
