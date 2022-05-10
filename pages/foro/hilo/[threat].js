import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import { formMessage } from "../../../components/application/formValidation"
import useAuth from "../../../components/application/useAuth"
import { useThreats } from "../../../components/application/useThreats"
import { firestoreTagService } from "../../../components/infrastructure/firestoreTagService"
import Message from "../../../components/presentation/message"

const Threat = ({ results, tagName }) => {
  const { title, description, user, date, likes, id, messages } = results

  const userAuth = useAuth()
  const { newAnswer } = useThreats()
  const router = useRouter()

  const messageSchema = formMessage
  const formValues = {
    text: ""
  }

  const handleSubmit = async (values) => {
    const {text } = values
    const userName = userAuth.user?.name
    await newAnswer(userName, text, tagName ,id)
    router.reload()
  }

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
                  tag={tagName}
                  id={id}
                />
              )
            })}
        </section>
        { userAuth?.user && 
        <Formik initialValues={formValues} validationSchema={messageSchema} onSubmit={handleSubmit}>
          { ({errors}) => (
            <Form className="form-control md:max-w-4xl md:mx-10">
              <h2 className="text-center text-xl mb-10">Nuevo mensaje</h2>
              <label className="input-group mb-7">
                <Field name="text" type="text" placeholder="Escribe tu mensaje..." className="input input-bordered w-full h-56" as="textarea"/>
              </label>
              <button type="submit" className="btn btn-primary my-3">Enviar mensaje</button>
              {Object.values(errors).map((error, index) => (
              <div
                className="alert alert-warning shadow-lg mb-7 max-w-xs md:max-w-full"
                key={index}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            ))}
            </Form>
          )}
        </Formik>
        }
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const query = params.threat
  const [tag, id] = query.split("-")
  const {getThreatById} = useThreats()
  const threats = await getThreatById(tag, id)
  const results = JSON.parse(JSON.stringify(threats))
  const tagName = tag
  return { props: { results, tagName } }
}

export default Threat
