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
            date: Timestamp.fromDate(new Date())
        }
        await firestoreTagService().newMessage(newMessage, tag, id)

    }

    return {
        getThreats, getThreatById, newAnswer
    }
}