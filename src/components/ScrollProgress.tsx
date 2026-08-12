import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-rose via-gold to-blush"
    />
  )
}
