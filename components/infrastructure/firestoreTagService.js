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
  arrayRemove,
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
    await updateDoc(threatRef, { messages: arrayUnion(message) })
  }

  const deleteMessage = async (message, tag, id) => {
    const threatRef = doc(firestore, `${tag}/${id}`)
    await updateDoc(threatRef, { messages: arrayRemove(message) })
  }

  const increaseVote = async (tag, id, userId) => {
    const threatRef = doc(firestore, `${tag}/${id}`)
    const threat = await getDoc(threatRef)
    const { likes } = threat.data()
    const newLikes = {
      count: likes.count + 1,
      users: [...likes.users, userId],
    }
    await updateDoc(threatRef, { likes: newLikes })
  }

  const decreaseVote = async (tag, id, userId) => {
    const threatRef = doc(firestore, `${tag}/${id}`)
    const threat = await getDoc(threatRef)
    const { likes } = threat.data()
    const newLikes = {
      count: likes.count - 1,
      users: likes.users.filter((user) => user !== userId),
    }
    await updateDoc(threatRef, { likes: newLikes })
  }

  const newThreat = async (newThreat, tag) => {
    const tagRef = collection(firestore, tag)
    await addDoc(tagRef, newThreat)
  }

  const deleteThreat = async (tag, id) => {
    const threatRef = doc(firestore, `${tag}/${id}`)
    await deleteDoc(threatRef)
  }

  return {
    getThreats,
    getThreatById,
    newMessage,
    deleteMessage,
    increaseVote,
    decreaseVote,
    newThreat,
    deleteThreat,
  }
}
