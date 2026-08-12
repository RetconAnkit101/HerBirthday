const BALLOONS = [
  { left: '4%', top: '12%', fill: '#ff5f8f', size: 88, delay: 0 },
  { left: '14%', top: '52%', fill: '#f0c977', size: 62, delay: 1.4 },
  { left: '84%', top: '16%', fill: '#ffd3e0', size: 76, delay: 0.7 },
  { left: '92%', top: '58%', fill: '#ff5f8f', size: 54, delay: 2.1 },
]

export function Balloons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="sway absolute"
          style={{ left: b.left, top: b.top, animationDelay: `${b.delay}s` }}
        >
          <svg width={b.size} height={b.size * 1.9} viewBox="0 0 100 190" fill="none">
            <ellipse cx="50" cy="55" rx="42" ry="52" fill={b.fill} opacity="0.9" />
            <ellipse cx="34" cy="36" rx="12" ry="18" fill="#fff6f0" opacity="0.35" />
            <path d="M50 107l-7 10h14l-7-10z" fill={b.fill} />
            <path
              d="M50 117c10 14-10 24 0 38s-9 22 0 34"
              stroke="#fff6f0"
              strokeOpacity="0.45"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
