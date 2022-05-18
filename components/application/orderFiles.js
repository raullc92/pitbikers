export function orderThreatsByLikes(threats) {
  const orderThreats = threats.sort((a, b) => b.likes.count - a.likes.count)
  return orderThreats
}

export function orderThreatsNewest(threats) {
  const orderThreats = threats.sort((a, b) => {
    const [dayA, monthA, restA] = a.date.split("/")
    const dateA = new Date(`${monthA}/${dayA}/${restA}`)
    const [dayB, monthB, restB] = b.date.split("/")
    const dateB = new Date(`${monthB}/${dayB}/${restB}`)
    return dateB - dateA
  })
  return orderThreats
}

export function orderThreatsOldest(threats) {
  const orderThreats = threats.sort((a, b) => {
    const [dayA, monthA, restA] = a.date.split("/")
    const dateA = new Date(`${monthA}/${dayA}/${restA}`)
    const [dayB, monthB, restB] = b.date.split("/")
    const dateB = new Date(`${monthB}/${dayB}/${restB}`)
    return dateA - dateB
  })
  return orderThreats
}
