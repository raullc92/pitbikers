import { Timestamp } from "firebase/firestore"
import { firestoreService } from "../infrastructure/firestoreService"

export function useUsers() {
  const registerNewUser = async (user, name) => {
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
  }

  const getUser = async (uid) => {
    const firestoreUser = await firestoreService.getUser(uid)
    return firestoreUser
  }

  return {
    registerNewUser,
    getUser,
  }
}
