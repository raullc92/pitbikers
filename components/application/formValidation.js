import * as Yup from "yup"

export function formLogin() {
  return Yup.object().shape({
    email: Yup.string()
      .email("Email no válido")
      .required("El email es requerido"),
    password: Yup.string()
      .min(5, "La contraseña debe contener un mínimo de 5 caracteres")
      .required("La contraseña es requerida"),
  })
}

export function formSignUp() {
  return Yup.object().shape({
    email: Yup.string()
      .email("Email no válido")
      .required("El email es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe contener un mínimo de 6 caracteres")
      .required("La contraseña es requerida"),
    name: Yup.string().required("El nombre es requerido"),
  })
}

export function formArticle() {
  return Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descrición es requerida"),
    tags: Yup.array(),
    image: Yup.mixed(),
  })
}

export function formMessage(){
  return Yup.object().shape({
    text: Yup.string().required("El campo del mensaje está vacío")
  })
}
