import Link from "next/link"
import useAuth from "../components/application/useAuth"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { formArticle } from "../components/application/formValidation"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { genericData } from "../components/application/genericData"
import { UseArticles } from "../components/application/useArticles"

export default function Login() {
  const [image, setImage] = useState(null)
  const { articleTags } = genericData
  const router = useRouter()
  const { createArticle } = UseArticles()

  const articleSchema = formArticle
  const formValues = {
    title: "",
    description: "",
    tags: [],
    image: null,
  }

  const handleSubmit = async (values) => {
    await createArticle(values, image)
    router.push("/")
  }

  return (
    <main className="grid justify-center h-screen items-center max-w-xs m-auto mb-60">
      <Formik
        initialValues={formValues}
        validationSchema={articleSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating, setFieldValue }) => (
          <Form className="form-control md:w-[500px] my-44 text-xl">
            <h1 className="text-center text-7xl mb-10">Nuevo Artículo</h1>
            <label className="input-group mb-7">
              <span className="md:w-36">Título</span>
              <Field
                name="title"
                type="text"
                placeholder=""
                className="input input-bordered w-full text-xl"
              />
            </label>
            <label className="input-group mb-7">
              <span className="md:w-36">description</span>
              <Field
                name="description"
                as="textarea"
                type="password"
                placeholder=""
                className="textarea textarea-primary w-full h-96 text-xl"
              />
            </label>
            <div id="checkbox-group">Tags</div>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="max-w-xs"
            >
              {articleTags.map((tag, index) => (
                <label
                  className="label cursor-pointer justify-start mx-2"
                  key={`${index}-${tag}`}
                >
                  <Field
                    type="checkbox"
                    name="tags"
                    value={tag}
                    className="checkbox checkbox-primary mx-2"
                  />
                  {tag}
                </label>
              ))}
            </div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="my-6"
            />

            <button type="submit" className="btn btn-primary my-6 text-xl">
              Crear artículo
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
    </main>
  )
}
