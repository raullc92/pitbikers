import { Formik, Form, Field } from "formik"
import useAuth from "../components/application/useAuth"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { formSignUp } from "../components/application/formValidation"

export default function Signup() {
  const { user, loginWithGoogle, createNewUser } = useAuth()
  const router = useRouter()

  const SignupSchema = formSignUp
  const formValues = {
    email: "",
    password: "",
    name: "",
  }

  const handleSubmit = async (values) => {
    const { email, password, name } = values
    const error = await createNewUser(email, password, name)
    console.log(error)
  }

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  return (
    <main className="grid justify-center h-screen items-center w-screen">
      <Formik
        initialValues={formValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="form-control md:w-[500px]">
            <h1 className="text-center text-6xl mb-10">Crear cuenta</h1>
            <label className="input-group mb-5 text-xl">
              <span className="md:w-36 ">Email</span>
              <Field
                name="email"
                type="email"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            <label className="input-group mb-5 text-xl">
              <span className="md:w-36">Contraseña</span>
              <Field
                name="password"
                type="password"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            <label className="input-group mb-5 text-xl">
              <span className="md:w-36">Nombre</span>
              <Field
                name="name"
                type="text"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            <button type="submit" className="btn btn-primary mb-5 text-xl">
              Registrarme
            </button>
            {Object.values(errors).map((error, index) => (
              <div
                className="alert alert-warning shadow-lg mb-7 max-w-xs md:max-w-full text-xl"
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
            <button
              type="button"
              className="btn btn-info text-xl"
              onClick={loginWithGoogle}
            >
              Registrarme con Google
            </button>
          </Form>
        )}
      </Formik>
    </main>
  )
}
