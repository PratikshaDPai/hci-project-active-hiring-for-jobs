import { ArrowLeft, MapPin, DollarSign, Users, Calendar } from 'lucide-react'
import { computeHealth } from '../utils/healthScore'
import { formatRelative, formatShort } from '../utils/dateHelpers'
import HealthBadge from './HealthBadge'
import FreshnessTimeline from './FreshnessTimeline'
import LinkedInComparison from './LinkedInComparison'

export default function JobDetail({ job, onBack }) {
  const health = computeHealth(job.activityEvents)

  return (
    <div className="space-y-6 animate-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <p className="text-lg text-gray-600 mt-1">{job.company}</p>
          </div>
          <HealthBadge health={health} size="lg" />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            {job.salaryRange}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {job.applicantCount} applicants
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Posted {formatShort(job.postDate)} ({formatRelative(job.postDate)})
          </span>
        </div>
      </div>

      {/* Hero: Freshness Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        <p className="text-sm text-gray-500">
          Recruiter activity signals mapped over time — is this listing still alive?
        </p>
        <FreshnessTimeline job={job} />
      </div>

      {/* LinkedIn comparison */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          The Transparency Gap
        </h3>
        <p className="text-sm text-gray-500">
          Same job listing, two very different levels of information.
        </p>
        <LinkedInComparison job={job} />
      </div>

      {/* Job details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">About this role</h3>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>

        <h4 className="font-semibold text-gray-900 pt-2">Requirements</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
