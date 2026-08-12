import { AnimatePresence, motion } from 'motion/react'
import { copy } from '../content'

/** Shown while the photos download, so no slide has to decode an image mid-scroll. */
export function Loader({ show, progress }: { show: boolean; progress: number }) {
  const percent = Math.min(100, Math.round(progress * 100))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink px-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-5xl"
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💗
          </motion.span>

          <p className="text-center font-script text-4xl text-cream">{copy.loader.line}</p>

          <div className="h-[3px] w-52 overflow-hidden rounded-full bg-cream/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose to-gold"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <p className="text-[0.65rem] tracking-[0.3em] text-cream/40 uppercase">{percent}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
