import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth"
import { deleteDoc } from "firebase/firestore"
import { firestoreService } from "./firestoreService"

export const AuthService = {
  login: async () => {
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
      .then((result) => ({ userUpdate: result.user, errorUpdate: null }))
      .catch((error) => ({ errorUpdate: error, userUpdate: null }))
  },

  loginEmailPass: async (email, password) => {
    let auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => ({ userUpdate: result.user, errorUpdate: null }))
      .catch((error) => ({ errorUpdate: error, userUpdate: null }))
  },

  createUser: async (email, password) => {
    let auth = getAuth()

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(result.user)
      return { userUpdate: result.user, errorUpdate: null }
    } catch (error) {
      return { userUpdate: null, errorUpdate: error }
    }
  },

  resetPass: async (email) => {
    let auth = getAuth()
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset succes")
      })
      .catch((error) => {
        return { error: error.message }
      })
  },

  logout: async () => {
    let auth = getAuth()
    signOut(auth)
      .then(() => {
        console.log("Sign out successful")
      })
      .catch((error) => ({ error }))
  },

  deleteUser: async () => {
    let auth = getAuth()
    let current = auth.currentUser
    return deleteUser(current)
      .then(() => {
        return { deleted: true, error: null }
      })
      .catch((error) => {
        return { deleted: false, error }
      })
  },
}
