import { AnimatePresence, motion } from 'motion/react'
import { config, copy } from '../content'

/**
 * Full-screen "tap to open" cover. The whole screen is the tap target — on a phone
 * a single small button is too easy to miss, and the page is scroll-locked until it opens.
 */
export function Gate({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={copy.gate.button}
          onClick={onOpen}
          onTouchEnd={onOpen}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') onOpen()
          }}
          className="group fixed inset-0 z-40 flex touch-manipulation items-center justify-center bg-ink/95 px-6 outline-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-7 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="font-sans text-xs tracking-[0.4em] text-blush/70 uppercase">
              {copy.gate.kicker}
            </span>

            <motion.span
              className="relative text-7xl"
              animate={{ rotate: [-6, 6, -6], y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎁
            </motion.span>

            <span className="font-script text-5xl text-cream text-glow sm:text-6xl">
              {config.herName}
            </span>

            <span className="pulse-ring relative cursor-pointer rounded-full border border-blush/40 px-8 py-3 text-sm tracking-[0.24em] text-cream uppercase transition-colors group-hover:bg-rose/20">
              {copy.gate.button}
            </span>

            <span className="text-[0.7rem] tracking-[0.18em] text-cream/40 lowercase">
              {copy.gate.hint}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
