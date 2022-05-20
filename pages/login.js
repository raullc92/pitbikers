import Link from "next/link"
import useAuth from "../components/application/useAuth"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { formLogin } from "../components/application/formValidation"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const { loginWithGoogle, user, loginWithEmailPassword, error } = useAuth()
  const [firebaseError, setFirebaseError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  const loginSchema = formLogin
  const formValues = {
    email: "",
    password: "",
  }

  const handleSubmit = async (values) => {
    setFirebaseError(false)
    const { email, password } = values
    const { errorUpdate } = await loginWithEmailPassword(email, password)
    errorUpdate == null ? setFirebaseError(true) : null
    console.log(firebaseError)
  }

  const handleClickGoogle = (e) => {
    e.preventDefault()
    loginWithGoogle()
  }

  return (
    <main className="grid justify-center h-screen items-center w-screen">
      <Formik
        initialValues={formValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="form-control md:w-[500px]">
            <h1 className="text-center text-7xl mb-10">Login</h1>
            <label className="input-group mb-7">
              <span className="md:w-36 text-xl">Email</span>
              <Field
                name="email"
                type="email"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            <label className="input-group mb-7">
              <span className="md:w-36 text-xl">Contraseña</span>
              <Field
                name="password"
                type="password"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            {firebaseError && (
              <div className="alert alert-error shadow-lg mb-7">
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
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Email o contraseña no válidos</span>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary mb-7">
              Iniciar Sesión
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
                  <span className=" text-xl">{error}</span>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row-reverse justify-between">
              <button
                type="button"
                className="btn btn-info mb-7 md:mx-6"
                onClick={handleClickGoogle}
              >
                Iniciar con Google
              </button>
              <Link href="/signup" className="">
                <a className="btn btn-accent mb-14 md:mx-6">Crear una cuenta</a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}
