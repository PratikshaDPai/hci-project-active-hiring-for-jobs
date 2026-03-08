import { computeHealth } from '../utils/healthScore'
import JobCard from './JobCard'
import FilterBar from './FilterBar'

export default function JobList({ jobs, filter, onFilterChange, onSelectJob }) {
  const filtered =
    filter === 'all'
      ? jobs
      : jobs.filter((job) => computeHealth(job.activityEvents).status === filter)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterBar active={filter} onChange={onFilterChange} />
        <span className="text-sm text-gray-400">
          {filtered.length} of {jobs.length} listings
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => onSelectJob(job)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No jobs match this filter.
        </div>
      )}
    </div>
  )
}
