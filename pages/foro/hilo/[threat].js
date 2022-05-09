import React from "react"
import { useThreats } from "../../../components/application/useThreats"
import { firestoreTagService } from "../../../components/infrastructure/firestoreTagService"
import Message from "../../../components/presentation/message"

const Threat = ({ results }) => {
  const { title, description, user, date, likes, id, messages } = results

  return (
    <div className="flex m-auto flex-col">
      <h1 className="m-auto text-center mt-44 text-4xl uppercase font-bold">
        {title}
      </h1>
      <div className="m-auto">
        <section>
          <Message user={user} text={description} date={date} color={true} />
          {messages &&
            messages.map((message) => {
              let owner = message.user == user
              return (
                <Message
                  key={message.date.seconds}
                  text={message.text}
                  date={message.date}
                  user={message.user}
                  color={owner}
                />
              )
            })}
        </section>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const query = params.threat
  const [tag, id] = query.split("-")
  // const { getThreatById } = firestoreTagService()
  // const threats = await getThreatById(tag, id)
  const {getThreatById} = useThreats()
  const threats = await getThreatById(tag, id)
  const results = JSON.parse(JSON.stringify(threats))
  return { props: { results } }
}

export default Threat
