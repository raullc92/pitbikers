import { Timestamp } from "firebase/firestore"
import { firestoreTagService } from "../infrastructure/firestoreTagService"

export function useThreats(){
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
            date: new Date().toLocaleString()
            //date: Timestamp.fromDate(new Date())
        }
        await firestoreTagService().newMessage(newMessage, tag, id)
    }

    const deleteMessage = async (message, tag, id) => {
        await firestoreTagService().deleteMessage(message, tag, id)
    }

    return {
        getThreats, getThreatById, newAnswer, deleteMessage
    }
}