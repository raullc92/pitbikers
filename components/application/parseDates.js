export function timestampToDate(timestamp) {
  const date = new Date(timestamp?.seconds * 1000)
  return date.toLocaleString().slice(0, -3)
}
