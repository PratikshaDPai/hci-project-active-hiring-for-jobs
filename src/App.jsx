import { useState } from 'react'
import Layout from './components/Layout'
import JobList from './components/JobList'
import JobDetail from './components/JobDetail'
import mockJobs from './data/mockJobs'

export default function App() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [filter, setFilter] = useState('all')

  return (
    <Layout>
      {selectedJob ? (
        <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <>
          {/* Intro banner */}
          <div className="mb-6 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 p-5 space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              The 30-Day Trust Gap
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Our research with 40 job seekers found that <strong>old listings feel like dead listings</strong>.
              Users perform manual hacks — checking recruiter LinkedIn activity,
              re-searching the same role — just to figure out if a job is still active.
              TrustJob surfaces <strong>recruiter activity signals</strong> directly in the listing UI,
              so you can see at a glance whether a job is worth your time.
            </p>
            <p className="text-xs text-gray-400">
              Click any card to see the full Freshness Timeline and LinkedIn comparison.
            </p>
          </div>

          <JobList
            jobs={mockJobs}
            filter={filter}
            onFilterChange={setFilter}
            onSelectJob={setSelectedJob}
          />
        </>
      )}
    </Layout>
  )
}
