import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { formMessage } from "../../../components/application/formValidation"
import useAuth from "../../../components/application/useAuth"
import { UseThreats } from "../../../components/application/useThreats"
import { firestoreTagService } from "../../../components/infrastructure/firestoreTagService"
import Message from "../../../components/presentation/message"
import Image from "next/image"
import ComeBack from "../../../components/presentation/comeBack"

const Threat = ({ results, tagName }) => {
  const { title, description, user, date, likes, id, messages } = results
  const [likeFalse, setLikeFalse] = useState("")

  const userAuth = useAuth()
  const { newAnswer } = UseThreats()
  const router = useRouter()
  const { increaseVote, decreaseVote } = UseThreats()

  const messageSchema = formMessage
  const formValues = {
    text: "",
  }

  useEffect(() => {
    if (likes.users.includes(userAuth?.user?.uid)) {
      setLikeFalse("vs_pressed")
    } else {
      setLikeFalse("vs_press")
    }
  }, [userAuth])

  const handleSubmit = async (values) => {
    const { text } = values
    const userName = userAuth.user?.name
    await newAnswer(userName, text, tagName, id)
    router.reload()
  }

  const handleClick = async () => {
    if (likeFalse === "vs_pressed") {
      await decreaseVote(tagName, id, userAuth.user?.uid)
      setLikeFalse("vs_press")
      likes.count--
    } else {
      await increaseVote(tagName, id, userAuth.user?.uid)
      setLikeFalse("vs_pressed")
      likes.count++
    }
  }

  return (
    <div className="flex m-auto flex-col">
      <h1 className="m-auto text-center mt-44 text-3xl md:text-6xl uppercase font-bold">
        {title}
      </h1>
      <div className="m-auto">
        {userAuth?.user && (
          <div className="mt-12 flex">
            <button className="btn h-auto p-0 mx-auto" onClick={handleClick}>
              <Image src={`/icons/${likeFalse}.svg`} width={100} height={100} />
            </button>
          </div>
        )}
        <div>
          <ComeBack />
        </div>
        <section>
          <Message
            user={user}
            text={description}
            date={date}
            color={true}
            mainMessage={true}
          />
          {messages &&
            messages.map((message) => {
              let owner = message.user == user
              return (
                <Message
                  key={`${message.date}-${message.user}`}
                  text={message.text}
                  date={message.date}
                  user={message.user}
                  color={owner}
                  tag={tagName}
                  id={id}
                  mainMessage={false}
                />
              )
            })}
        </section>
        {userAuth?.user && (
          <Formik
            initialValues={formValues}
            validationSchema={messageSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form className="form-control md:max-w-4xl md:mx-10 my-60">
                <h2 className="text-center text-3xl mb-10 uppercase">
                  Nuevo mensaje
                </h2>
                <label className="input-group mb-7">
                  <Field
                    name="text"
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="input input-bordered w-full h-56 text-xl"
                    as="textarea"
                  />
                </label>
                <button type="submit" className="btn btn-primary my-3 text-xl">
                  Enviar mensaje
                </button>
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
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const query = params.threat
  const [tag, id] = query.split("-")
  const { getThreatById } = UseThreats()
  const threats = await getThreatById(tag, id)
  const results = JSON.parse(JSON.stringify(threats))
  const tagName = tag
  return { props: { results, tagName } }
}

export default Threat
