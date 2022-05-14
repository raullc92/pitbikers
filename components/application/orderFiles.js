export function orderThreatsByLikes(threats) {
  const orderThreats = threats.sort((a, b) => b.likes.count - a.likes.count)
  return orderThreats
}

export function orderThreatsNewest(threats) {
  const orderThreats = threats.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  return orderThreats
}

export function orderThreatsOldest(threats) {
  const orderThreats = threats.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )
  return orderThreats
}
