import { useUsers } from "../components/application/useUsers"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useAuth from "../components/application/useAuth"
import Link from "next/link"

export default function Perfil() {
  const { user, deleteUser } = useAuth()
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault()
    await deleteUser(user.id)
    router.push("/")
  }

  return (
    <>
      <main className="flex w-screen h-screen flex-col justify-center max-w-xs m-auto md:max-w-lg">
        {user ? (
          <>
            <h1 className="text-6xl  font-bold my-20 text-center">
              Configura tu perfil
            </h1>
            <div className="avatar placeholder flex">
              <div className="w-24 rounded-full bg-primary text-neutral-content items-center m-auto mb-3">
                {user?.avatar ? (
                  <img src={user.avatar} />
                ) : (
                  <span className="text-3xl">
                    {user?.name?.slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <h2 className="text-xl my-3">
              <span className="font-bold">Nombre:</span> {user?.name}
            </h2>
            <h2 className="text-xl my-3">
              <span className="font-bold">Email:</span> {user?.email}
            </h2>
            <h2 className="text-xl my-3">
              <span className="font-bold">Rol:</span> {user?.role}
            </h2>
            <Link href="/nuevo-articulo">
              <a className="btn btn-info my-3">Crear nuevo artículo</a>
            </Link>
            <label
              htmlFor="my-modal-4"
              className="btn btn-error modal-button mt-16"
            >
              Eliminar cuenta
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative">
                <h3 className="text-lg font-bold">
                  Estás seguro que deseas eliminar tu cuenta?
                </h3>
                <p className="py-4">Esta acción es irreversible.</p>
                <div className="modal-action">
                  <button className="btn btn-error" onClick={handleClick}>
                    Sí, deseo eliminar mi cuenta
                  </button>
                </div>
              </label>
            </label>
          </>
        ) : (
          <h1 className="text-6xl text-center font-bold my-20">
            Primero debes logearte
          </h1>
        )}
      </main>
    </>
  )
}