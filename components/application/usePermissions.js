export function articlePermission(role) {
  if (role == "adminPost" || role == "superAdmin") {
    return true
  }
  return false
}

export function forumPermission(role) {
  if (role == "adminForum" || role == "superAdmin") {
    return true
  }
  return false
}
