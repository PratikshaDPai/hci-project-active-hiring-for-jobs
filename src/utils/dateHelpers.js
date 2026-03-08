/**
 * Calculate days between two dates
 */
export function daysBetween(dateA, dateB) {
  const a = new Date(dateA)
  const b = new Date(dateB)
  const diffMs = Math.abs(b - a)
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Format a date string as a relative time ("3 days ago", "2 weeks ago")
 */
export function formatRelative(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const days = daysBetween(date, now)

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 14) return '1 week ago'
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 60) return '1 month ago'
  return `${Math.floor(days / 30)} months ago`
}

/**
 * Format a date string as short display ("Jan 15")
 */
export function formatShort(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Get today's date as ISO string (date portion)
 */
export function today() {
  return new Date().toISOString().split('T')[0]
}
