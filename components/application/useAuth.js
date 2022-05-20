import { createContext, useState, useContext, useEffect } from "react"
import { AuthService } from "../infrastructure/authService"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { UseUsers } from "./useUsers"
import { firestoreService } from "../infrastructure/firestoreService"

const authContext = createContext()

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { registerNewUser, getUser } = UseUsers()

  useEffect(() => {
    setLoading(true)
    const auth = getAuth()

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const firestoreUser = await getUser(user.uid)
        const updateUser = {
          ...user,
          ...firestoreUser,
        }
        setUser(updateUser)
        setError({})
      } else {
        setUser(null)
      }
    })
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   setLoading(true)
  //   const auth = getAuth()
  //   if (user?.role == undefined) {
  //     onAuthStateChanged(auth, async (user) => {
  //       if (user) {
  //         getUser(user.uid).then((firestoreUser) => {
  //           const updateUser = {
  //             ...user,
  //             ...firestoreUser,
  //           }
  //           setUser(updateUser)
  //           setError({})
  //         })
  //       } else {
  //         setUser(null)
  //       }
  //     })
  //     setLoading(false)
  //   }
  // }, [])

  const loginWithGoogle = async () => {
    const { userUpdate, errorUpdate } = await AuthService.login()
    setUser(userUpdate ?? null)
    setError(errorUpdate ?? null)
    const { registerNewUser } = UseUsers()
    registerNewUser(userUpdate)
  }

  const loginWithEmailPassword = async (email, password) => {
    const { userUpdate, errorUpdate } = await AuthService.loginEmailPass(
      email,
      password
    )
    setUser(userUpdate ?? null)
    setError(errorUpdate ?? null)
    return errorUpdate
  }

  const logout = async () => {
    await AuthService.logout()
    setError(false)
    setUser(null)
    router.push("/")
  }

  const createNewUser = async (email, password, name) => {
    const { userUpdate, errorUpdate } = await AuthService.createUser(
      email,
      password
    )
    //setUser(userUpdate ?? null)
    setError(errorUpdate ?? null)
    const { registerNewUser } = UseUsers()
    const userFirestore = await registerNewUser(userUpdate, name)
    const completeUser = { ...userUpdate, ...userFirestore }
    setUser(completeUser)
    return errorUpdate
  }

  const resetPassword = async (email) => {
    const { error } = await AuthService.resetPass(email)
    setError(error ?? null)
  }

  const deleteUser = async () => {
    await firestoreService.deleteUser(user.uid)
    await AuthService.deleteUser()
  }

  const value = {
    user,
    error,
    loading,
    loginWithGoogle,
    logout,
    setUser,
    loginWithEmailPassword,
    createNewUser,
    resetPassword,
    verifiedEmail: user?.emailVerified,
    deleteUser,
  }

  return <authContext.Provider value={value} {...props} />
}
