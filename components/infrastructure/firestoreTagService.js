import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  deleteDoc,
  updateDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import app from "./firebaseApp"

export function firestoreTagService() {
  const firestore = getFirestore(app)

  const getThreats = async (tag) => {
    const tags = await getDocs(collection(firestore, tag))
    const threats = []
    tags.forEach((doc) => {
      let newThreat = {
        id: doc.id,
        ...doc.data(),
      }
      threats.push(newThreat)
    })
    return threats
  }

  const getThreatById = async (tag, id) => {
    const docRef = doc(firestore, `${tag}/${id}`)
    const docSnap = await getDoc(docRef)
    const threat = {
      id: docSnap.id,
      ...docSnap.data(),
    }
    return threat
  }

  const newMessage = async (message, tag, id) => {
    const threatRef = doc(firestore, `${tag}/${id}`)
    await updateDoc(threatRef, { messages: arrayUnion(message)})
  }

  return { getThreats, getThreatById, newMessage }
}
