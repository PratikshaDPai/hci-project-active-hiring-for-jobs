// 8 jobs covering all health states:
// 2 active, 2 stale, 3 inactive, 1 "old but alive" edge case

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

const mockJobs = [
  // ── ACTIVE ──────────────────────────────────────────
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA (Hybrid)',
    salaryRange: '$180k – $240k',
    postDate: daysAgo(12),
    description:
      'Join our Dashboard team to build delightful, performant interfaces for millions of businesses. You will work closely with designers and backend engineers to ship features that simplify complex financial workflows.',
    requirements: [
      '5+ years React/TypeScript experience',
      'Experience with design systems',
      'Strong CS fundamentals',
      'Bonus: payments/fintech background',
    ],
    applicantCount: 87,
    activityEvents: [
      { type: 'posted', date: daysAgo(12), label: 'Job posted' },
      { type: 'recruiter_viewed', date: daysAgo(5), label: 'Recruiter viewed applications' },
      { type: 'interview_scheduled', date: daysAgo(2), label: 'Interview scheduled' },
    ],
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Figma',
    location: 'New York, NY (Remote OK)',
    salaryRange: '$160k – $210k',
    postDate: daysAgo(8),
    description:
      'Design the future of collaborative design tools. You will own end-to-end design for key product surfaces, from early research through pixel-perfect handoff.',
    requirements: [
      '4+ years product design experience',
      'Strong portfolio with shipped products',
      'Proficiency in Figma (obviously!)',
      'Experience with user research',
    ],
    applicantCount: 124,
    activityEvents: [
      { type: 'posted', date: daysAgo(8), label: 'Job posted' },
      { type: 'recruiter_online', date: daysAgo(3), label: 'Recruiter active on platform' },
      { type: 'recruiter_viewed', date: daysAgo(1), label: 'Recruiter viewed applications' },
    ],
  },

  // ── STALE ───────────────────────────────────────────
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'Notion',
    location: 'San Francisco, CA',
    salaryRange: '$170k – $220k',
    postDate: daysAgo(30),
    description:
      'Help scale Notion\u2019s infrastructure to support hundreds of millions of users. Work on real-time collaboration, search, and data platform challenges.',
    requirements: [
      '3+ years backend development',
      'Experience with distributed systems',
      'Proficiency in Go or Rust',
      'Database optimization experience',
    ],
    applicantCount: 203,
    activityEvents: [
      { type: 'posted', date: daysAgo(30), label: 'Job posted' },
      { type: 'recruiter_viewed', date: daysAgo(18), label: 'Recruiter viewed applications' },
      { type: 'recruiter_online', date: daysAgo(12), label: 'Recruiter active on platform' },
    ],
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Airbnb',
    location: 'Seattle, WA (Hybrid)',
    salaryRange: '$155k – $200k',
    postDate: daysAgo(25),
    description:
      'Use data to shape the future of travel. You will partner with product and engineering teams to build ML models that power search ranking, pricing, and personalization.',
    requirements: [
      'MS/PhD in Statistics, CS, or related field',
      'Strong SQL and Python skills',
      'Experience with ML pipelines',
      'A/B testing expertise',
    ],
    applicantCount: 178,
    activityEvents: [
      { type: 'posted', date: daysAgo(25), label: 'Job posted' },
      { type: 'description_updated', date: daysAgo(15), label: 'Job description updated' },
    ],
  },

  // ── INACTIVE ────────────────────────────────────────
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'Coinbase',
    location: 'Remote (US)',
    salaryRange: '$165k – $215k',
    postDate: daysAgo(55),
    description:
      'Build and maintain cloud infrastructure for one of the largest crypto platforms. Focus on reliability, security, and developer productivity.',
    requirements: [
      '4+ years DevOps/SRE experience',
      'AWS or GCP expertise',
      'Kubernetes & Terraform',
      'Security-first mindset',
    ],
    applicantCount: 342,
    activityEvents: [
      { type: 'posted', date: daysAgo(55), label: 'Job posted' },
      { type: 'recruiter_viewed', date: daysAgo(40), label: 'Recruiter viewed applications' },
    ],
  },
  {
    id: 6,
    title: 'iOS Engineer',
    company: 'Robinhood',
    location: 'Menlo Park, CA',
    salaryRange: '$175k – $230k',
    postDate: daysAgo(62),
    description:
      'Build the next generation of the Robinhood iOS app. Work on trading flows, portfolio views, and real-time market data rendering.',
    requirements: [
      '4+ years iOS (Swift) development',
      'UIKit and SwiftUI experience',
      'Performance optimization skills',
      'Fintech experience a plus',
    ],
    applicantCount: 289,
    activityEvents: [
      { type: 'posted', date: daysAgo(62), label: 'Job posted' },
      { type: 'recruiter_online', date: daysAgo(45), label: 'Recruiter active on platform' },
      { type: 'recruiter_viewed', date: daysAgo(38), label: 'Recruiter viewed applications' },
    ],
  },
  {
    id: 7,
    title: 'Marketing Analyst',
    company: 'DoorDash',
    location: 'Los Angeles, CA',
    salaryRange: '$95k – $130k',
    postDate: daysAgo(48),
    description:
      'Drive growth through data-driven marketing strategies. Analyze campaign performance, optimize spend allocation, and build dashboards for stakeholder reporting.',
    requirements: [
      '2+ years marketing analytics',
      'SQL and Excel proficiency',
      'Experience with Google Analytics / Mixpanel',
      'Strong communication skills',
    ],
    applicantCount: 410,
    activityEvents: [
      { type: 'posted', date: daysAgo(48), label: 'Job posted' },
    ],
  },

  // ── EDGE CASE: old but alive ────────────────────────
  {
    id: 8,
    title: 'Staff Engineer, Platform',
    company: 'Datadog',
    location: 'New York, NY (Hybrid)',
    salaryRange: '$220k – $300k',
    postDate: daysAgo(70),
    description:
      'Lead architectural decisions for Datadog\u2019s core platform. This is a high-impact role working on systems that process trillions of data points per day.',
    requirements: [
      '8+ years software engineering',
      'Distributed systems expertise',
      'Technical leadership experience',
      'Go, Java, or C++ proficiency',
    ],
    applicantCount: 156,
    activityEvents: [
      { type: 'posted', date: daysAgo(70), label: 'Job posted' },
      { type: 'recruiter_viewed', date: daysAgo(50), label: 'Recruiter viewed applications' },
      { type: 'reposted', date: daysAgo(35), label: 'Job reposted' },
      { type: 'recruiter_viewed', date: daysAgo(14), label: 'Recruiter viewed applications' },
      { type: 'interview_scheduled', date: daysAgo(5), label: 'Interview scheduled' },
    ],
  },
]

export default mockJobs
