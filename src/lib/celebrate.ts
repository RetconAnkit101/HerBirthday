import confetti from 'canvas-confetti'

const ROSE = ['#ff5f8f', '#ffd3e0', '#f0c977', '#fff6f0', '#7b1e46']

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Two side cannons, used when the site opens. */
export function burst() {
  if (prefersReducedMotion()) return
  const shared = { particleCount: 70, spread: 70, colors: ROSE, disableForReducedMotion: true }
  void confetti({ ...shared, origin: { x: 0.05, y: 0.9 }, angle: 60 })
  void confetti({ ...shared, origin: { x: 0.95, y: 0.9 }, angle: 120 })
}

/** Slow rain of hearts, used for the big "yes" moment. */
export function heartStorm(durationMs = 2600) {
  if (prefersReducedMotion()) return
  const heart = confetti.shapeFromText ? confetti.shapeFromText({ text: '💖', scalar: 2.4 }) : undefined
  const end = Date.now() + durationMs

  const frame = () => {
    void confetti({
      particleCount: 4,
      startVelocity: 22,
      ticks: 260,
      gravity: 0.55,
      spread: 360,
      scalar: heart ? 2.2 : 1,
      shapes: heart ? [heart] : undefined,
      colors: ROSE,
      origin: { x: Math.random(), y: Math.random() * 0.3 },
      disableForReducedMotion: true,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
