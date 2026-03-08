import { MapPin, DollarSign, Users } from 'lucide-react'
import { computeHealth } from '../utils/healthScore'
import { formatRelative } from '../utils/dateHelpers'
import HealthBadge from './HealthBadge'
import { MiniTimeline } from './FreshnessTimeline'

const BORDER_COLORS = {
  active: 'border-l-emerald-500',
  stale: 'border-l-amber-500',
  inactive: 'border-l-red-500',
}

const BG_COLORS = {
  active: 'bg-white',
  stale: 'bg-white',
  inactive: 'bg-red-50/40',
}

export default function JobCard({ job, onClick }) {
  const health = computeHealth(job.activityEvents)

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border border-l-4 ${BORDER_COLORS[health.status]} ${BG_COLORS[health.status]} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-4 flex flex-col gap-3`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <HealthBadge health={health} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          {job.salaryRange}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {job.applicantCount} applicants
        </span>
      </div>

      {/* Mini timeline */}
      <MiniTimeline job={job} />

      {/* Footer */}
      <p className="text-xs text-gray-400">
        Posted {formatRelative(job.postDate)} · Last activity {formatRelative(
          job.activityEvents[job.activityEvents.length - 1]?.date || job.postDate
        )}
      </p>
    </button>
  )
}
