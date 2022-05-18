import React, { useEffect, useState } from "react"
import { formThreat } from "../../components/application/formValidation"
import useAuth from "../../components/application/useAuth"
import { useThreats } from "../../components/application/useThreats"
import { firestoreTagService } from "../../components/infrastructure/firestoreTagService"
import ThreatCard from "../../components/presentation/threatCard"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import {
  orderThreatsByLikes,
  orderThreatsNewest,
  orderThreatsOldest,
} from "../../components/application/orderFiles"
import ComeBack from "../../components/presentation/comeBack"

const Tag = ({ results, tag }) => {
  const parseTag = tag.slice(3)
  const { user } = useAuth()
  const { newThreat } = useThreats()
  const router = useRouter()

  const [threats, setThreats] = useState([])
  useEffect(() => {
    setThreats(results)
  }, [results])

  const threatSchema = formThreat
  const formValues = {
    title: "",
    description: "",
  }

  const handleSubmit = async (values) => {
    await newThreat(user.name, values.title, values.description, tag)
    router.reload()
  }

  const orderByLikes = async () => {
    const orderedThreats = orderThreatsByLikes(threats)
    setThreats([...orderedThreats])
  }

  const orderByNewest = () => {
    const orderedThreats = orderThreatsNewest(threats)
    setThreats([...orderedThreats])
  }

  const orderByOldest = () => {
    const orderedThreats = orderThreatsOldest(threats)
    setThreats([...orderedThreats])
  }

  return (
    <div className="flex m-auto flex-col">
      <h1 className="m-auto mt-44 text-4xl md:text-6xl uppercase font-bold">
        {parseTag}
      </h1>
      <ComeBack forum={true} />
      <div className="m-auto flex items-center gap-4 my-8 flex-wrap max-w-xs md:max-w-lg text-xl">
        <h3>Ordenar por:</h3>
        <button className="btn btn-success" onClick={orderByLikes}>
          Likes
        </button>
        <button className="btn btn-info" onClick={orderByNewest}>
          Más recientes
        </button>
        <button className="btn btn-warning" onClick={orderByOldest}>
          Más antiguos
        </button>
      </div>
      <div className="m-auto">
        <section>
          {threats ? (
            threats.map((threat) => (
              <ThreatCard
                key={threat.id}
                title={threat.title}
                user={threat.user}
                description={threat.description}
                date={threat.date}
                likes={threat.likes}
                id={threat.id}
                tag={tag}
              />
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </section>
        {user && (
          <Formik
            initialValues={formValues}
            validationSchema={threatSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form className="form-control md:max-w-4xl md:mx-10 my-60">
                <h2 className="text-center text-3xl mb-10 uppercase">
                  Nuevo Hilo
                </h2>
                <label className="input-group mb-7">
                  <Field
                    name="title"
                    type="text"
                    placeholder="Escribe el título"
                    className="input input-bordered w-full text-xl"
                  />
                </label>
                <label className="input-group mb-7">
                  <Field
                    name="description"
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
  const tag = params.tag
  const { getThreats } = useThreats()
  const threats = await getThreats(tag)
  const results = JSON.parse(JSON.stringify(threats))
  return { props: { results, tag } }
}

export default Tag
