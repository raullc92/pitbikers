import { Timestamp } from "firebase/firestore"
import { firestoreService } from "../infrastructure/firestoreService"

export function UseUsers() {
  const registerNewUser = async (user, name) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user
      const userName = name ?? displayName
      const newUser = {
        uid,
        email,
        name: userName,
        avatar: photoURL,
        createdAt: Timestamp.fromDate(new Date()),
        role: "user",
        articleVotes: [],
      }
      await firestoreService.newUser(uid, newUser)
      const resultUser = await firestoreService.getUser(newUser.uid)
      return resultUser
    }
  }

  const getUser = async (uid) => {
    const firestoreUser = await firestoreService.getUser(uid)
    return firestoreUser
  }

  const getUsers = async () => {
    const firestoreUsers = await firestoreService.getUsers()
    return firestoreUsers
  }

  // const updateUserRole = async (user) => {
  //   let { uid, role } = user
  //   role === "admin" ? (role = "user") : (role = "admin")
  //   await firestoreService.updateUserRole(uid, role)
  // }

  const updateUserRole = async (uid, role) => {
    await firestoreService.updateUserRole(uid, role)
  }

  return {
    registerNewUser,
    getUser,
    getUsers,
    updateUserRole,
  }
}
