import { Timestamp } from "firebase/firestore"
import { firestoreTagService } from "../infrastructure/firestoreTagService"

export function useThreats() {
  const getThreats = async (tag) => {
    const threats = await firestoreTagService().getThreats(tag)
    return threats
  }

  const getThreatById = async (tag, id) => {
    const threat = await firestoreTagService().getThreatById(tag, id)
    return threat
  }

  const newAnswer = async (user, text, tag, id) => {
    let newMessage = {
      user,
      text,
      date: new Date().toLocaleString(),
      //date: Timestamp.fromDate(new Date())
    }
    await firestoreTagService().newMessage(newMessage, tag, id)
  }

  const deleteMessage = async (message, tag, id) => {
    await firestoreTagService().deleteMessage(message, tag, id)
  }

  const increaseVote = async (tag, id, userId) => {
    await firestoreTagService().increaseVote(tag, id, userId)
  }

  const decreaseVote = async (tag, id, userId) => {
    await firestoreTagService().decreaseVote(tag, id, userId)
  }

  return {
    getThreats,
    getThreatById,
    newAnswer,
    deleteMessage,
    increaseVote,
    decreaseVote,
  }
}
