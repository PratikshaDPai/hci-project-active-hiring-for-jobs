const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active', dot: 'bg-emerald-500' },
  { key: 'stale', label: 'Slowing Down', dot: 'bg-amber-500' },
  { key: 'inactive', label: 'Inactive', dot: 'bg-red-500' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
            active === f.key
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {f.dot && <span className={`w-2 h-2 rounded-full ${f.dot}`} />}
          {f.label}
        </button>
      ))}
    </div>
  )
}
