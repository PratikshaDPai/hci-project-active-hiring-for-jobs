import { formatRelative } from '../utils/dateHelpers'

export default function LinkedInComparison({ job }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* LinkedIn mockup */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#0A66C2] flex items-center justify-center">
            <span className="text-white text-xs font-bold">in</span>
          </div>
          <span className="text-sm font-semibold text-gray-500">What LinkedIn shows</span>
        </div>
        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-2">
          <p className="font-semibold text-gray-900">{job.title}</p>
          <p className="text-sm text-gray-600">{job.company} · {job.location}</p>
          <div className="flex gap-3 text-xs text-gray-500 pt-1">
            <span>Posted {formatRelative(job.postDate)}</span>
            <span>·</span>
            <span>{job.applicantCount} applicants</span>
          </div>
          <p className="text-xs text-gray-400 pt-2 italic">
            That's it. No recruiter activity. No freshness signal. Is this job still alive?
          </p>
        </div>
      </div>

      {/* TrustJob mockup */}
      <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50/30 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-sm font-semibold text-emerald-700">What TrustJob shows</span>
        </div>
        <div className="border border-emerald-100 rounded-lg p-3 bg-white space-y-2">
          <p className="font-semibold text-gray-900">{job.title}</p>
          <p className="text-sm text-gray-600">{job.company} · {job.location}</p>
          <div className="text-xs text-gray-600 space-y-1 pt-1">
            {job.activityEvents.map((evt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{evt.label}</span>
                <span className="text-gray-400">({formatRelative(evt.date)})</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-700 font-medium pt-2">
            Full activity timeline + health score = confidence to apply (or move on).
          </p>
        </div>
      </div>
    </div>
  )
}
