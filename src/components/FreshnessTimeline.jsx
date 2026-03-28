import {
  CalendarPlus,
  RefreshCw,
  Eye,
  UserCheck,
  CalendarCheck,
  FileEdit,
  Circle,
} from 'lucide-react'
import { formatShort, daysBetween, today } from '../utils/dateHelpers'
import { computeHealth, getVerdict } from '../utils/healthScore'

const EVENT_ICONS = {
  posted: CalendarPlus,
  reposted: RefreshCw,
  recruiter_viewed: Eye,
  recruiter_online: UserCheck,
  interview_scheduled: CalendarCheck,
  description_updated: FileEdit,
}

// ── Full Timeline (detail view) ───────────────────────

export default function FreshnessTimeline({ job }) {
  const events = [...job.activityEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )
  const health = computeHealth(job.activityEvents)
  const verdict = getVerdict(health)

  const startDate = new Date(events[0].date)
  const endDate = new Date(today())
  const totalSpan = daysBetween(events[0].date, today()) || 1

  function pct(dateStr) {
    return (daysBetween(events[0].date, dateStr) / totalSpan) * 100
  }

  const gradientBar = getGradientBar(health.status)

  return (
    <div className="space-y-4">
      {/* ── Desktop: horizontal ── */}
      <div className="hidden sm:block">
        <div className="relative h-32 mx-4">
          {/* Track line: solid between events */}
          <div
            className="absolute top-6 h-0.5 bg-gray-300"
            style={{
              left: `${pct(events[0].date)}%`,
              width: `${pct(events[events.length - 1].date) - pct(events[0].date)}%`,
            }}
          />
          {/* Dashed line: last event → today */}
          <div
            className="absolute top-6 h-0.5 border-t-2 border-dashed border-gray-300"
            style={{
              left: `${pct(events[events.length - 1].date)}%`,
              width: `${100 - pct(events[events.length - 1].date)}%`,
            }}
          />

          {/* Event nodes */}
          {events.map((evt, i) => {
            const Icon = EVENT_ICONS[evt.type] || Circle
            const left = pct(evt.date)
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                  {formatShort(evt.date)}
                </span>
                <span className="text-xs font-medium text-gray-700 mt-0.5 whitespace-nowrap max-w-[100px] truncate text-center" title={evt.label}>
                  {evt.label}
                </span>
              </div>
            )
          })}

          {/* Today marker */}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: '100%', transform: 'translateX(-50%)' }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-500">NOW</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{formatShort(today())}</span>
          </div>
        </div>

        {/* Gradient bar */}
        <div className={`h-2 rounded-full mx-4 ${gradientBar}`} />
      </div>

      {/* ── Mobile: vertical ── */}
      <div className="sm:hidden">
        <div className="relative ml-4 pl-6 border-l-2 border-gray-300 space-y-6">
          {events.map((evt, i) => {
            const Icon = EVENT_ICONS[evt.type] || Circle
            return (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-gray-600" />
                </div>
                <div>
                  <span className="text-xs text-gray-500">{formatShort(evt.date)}</span>
                  <p className="text-sm font-medium text-gray-700">{evt.label}</p>
                </div>
              </div>
            )
          })}
          {/* Dashed tail */}
          <div className="relative">
            <div className="absolute -left-[31px] w-6 h-6 rounded-full bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center">
              <span className="text-[8px] font-bold text-gray-500">NOW</span>
            </div>
            <div>
              <span className="text-xs text-gray-500">{formatShort(today())}</span>
              <p className="text-sm text-gray-400">Today</p>
            </div>
          </div>
        </div>
        <div className={`h-2 rounded-full mt-4 ${gradientBar}`} />
      </div>

      {/* Verdict card */}
      <div
        className={`rounded-lg p-4 text-sm ${
          health.status === 'active'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : health.status === 'stale'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-red-50 text-red-800 border border-red-200'
        }`}
      >
        {verdict}
      </div>
    </div>
  )
}

// ── Mini Timeline (card view) ─────────────────────────

export function MiniTimeline({ job }) {
  const health = computeHealth(job.activityEvents)
  const gradientBar = getGradientBar(health.status)

  return <div className={`h-1 rounded-full w-full ${gradientBar}`} />
}

// ── Gradient helpers ──────────────────────────────────

function getGradientBar(status) {
  if (status === 'active') return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
  if (status === 'stale') return 'bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-500'
  return 'bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500'
}
