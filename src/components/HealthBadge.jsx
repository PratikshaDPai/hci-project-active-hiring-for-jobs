const STYLES = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  stale: 'bg-amber-100 text-amber-800 border-amber-300',
  inactive: 'bg-red-100 text-red-800 border-red-300',
}

export default function HealthBadge({ health, size = 'sm' }) {
  const base = STYLES[health.status] || STYLES.inactive
  const sizeClass = size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${base} ${sizeClass}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          health.status === 'active'
            ? 'bg-emerald-500'
            : health.status === 'stale'
              ? 'bg-amber-500'
              : 'bg-red-500'
        }`}
      />
      {health.label}
    </span>
  )
}
