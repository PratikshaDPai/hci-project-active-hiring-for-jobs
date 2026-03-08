import { daysBetween, today } from './dateHelpers'

// Stronger signals get a recency bonus (treated as more recent than they are)
const SIGNAL_STRENGTH = {
  interview_scheduled: 5, // strong — subtract 5 days from staleness calc
  recruiter_viewed: 3,    // strong
  reposted: 4,            // repost resets staleness aggressively
  description_updated: 2, // moderate
  recruiter_online: 1,    // weak
  posted: 0,              // baseline
}

/**
 * Compute health status from activity events.
 * Returns { status: 'active'|'stale'|'inactive', daysSinceActivity, lastEvent, color }
 */
export function computeHealth(activityEvents) {
  if (!activityEvents || activityEvents.length === 0) {
    return {
      status: 'inactive',
      daysSinceActivity: Infinity,
      lastEvent: null,
      color: 'red',
      label: 'Likely Inactive',
    }
  }

  // Sort events by date descending
  const sorted = [...activityEvents].sort((a, b) => new Date(b.date) - new Date(a.date))
  const lastEvent = sorted[0]
  const rawDays = daysBetween(lastEvent.date, today())
  const bonus = SIGNAL_STRENGTH[lastEvent.type] || 0
  const effectiveDays = Math.max(0, rawDays - bonus)

  if (effectiveDays <= 7) {
    return {
      status: 'active',
      daysSinceActivity: rawDays,
      lastEvent,
      color: 'emerald',
      label: 'Active',
    }
  }

  if (effectiveDays <= 21) {
    return {
      status: 'stale',
      daysSinceActivity: rawDays,
      lastEvent,
      color: 'amber',
      label: 'Slowing Down',
    }
  }

  return {
    status: 'inactive',
    daysSinceActivity: rawDays,
    lastEvent,
    color: 'red',
    label: 'Likely Inactive',
  }
}

/**
 * Generate a plain-English verdict about the job's freshness.
 */
export function getVerdict(health) {
  const { status, daysSinceActivity, lastEvent } = health

  if (!lastEvent) return 'No activity data available for this listing.'

  const eventLabel = lastEvent.label || lastEvent.type.replace(/_/g, ' ')
  const dateStr = new Date(lastEvent.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })

  if (status === 'active') {
    return `Good sign — ${eventLabel.toLowerCase()} ${daysSinceActivity === 0 ? 'today' : `${daysSinceActivity} day${daysSinceActivity === 1 ? '' : 's'} ago`}. This listing appears actively managed.`
  }

  if (status === 'stale') {
    return `Activity is slowing down. Last sign of life: ${eventLabel} on ${dateStr} (${daysSinceActivity} days ago).`
  }

  return `No recruiter activity for ${daysSinceActivity} days. Last sign of life: ${eventLabel} on ${dateStr}. This listing may no longer be active.`
}
