import React, { useEffect } from "react"
import { formThreat } from "../../components/application/formValidation"
import useAuth from "../../components/application/useAuth"
import { useThreats } from "../../components/application/useThreats"
import { firestoreTagService } from "../../components/infrastructure/firestoreTagService"
import ThreatCard from "../../components/presentation/threatCard"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"

const Tag = ({ results, tag }) => {
  const parseTag = tag.slice(3)
  const { user } = useAuth()
  const { newThreat } = useThreats()
  const router = useRouter()

  const threatSchema = formThreat
  const formValues = {
    title: "",
    description: "",
  }

  const handleSubmit = async (values) => {
    await newThreat(user.name, values.title, values.description, tag)
    router.reload()
  }

  return (
    <div className="flex m-auto flex-col">
      <h1 className="m-auto mt-44 text-6xl uppercase font-bold">{parseTag}</h1>
      <div className="m-auto">
        <section>
          {results ? (
            results.map((threat) => (
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
              <Form className="form-control md:max-w-4xl md:mx-10">
                <h2 className="text-center text-xl mb-10">Nuevo Hilo</h2>
                <label className="input-group mb-7">
                  <Field
                    name="title"
                    type="text"
                    placeholder="Escribe el título"
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="input-group mb-7">
                  <Field
                    name="description"
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="input input-bordered w-full h-56"
                    as="textarea"
                  />
                </label>
                <button type="submit" className="btn btn-primary my-3">
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
