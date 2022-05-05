import Link from "next/link"
import React from "react"
import useAuth from "../application/useAuth"
import UserDropDown from "./navbar/userDropDown"

const Navbar = () => {
  const { logout, user } = useAuth()

  return (
    <div className="navbar backdrop-blur-sm fixed z-10 px-0">
      <div className="flex-1 px-2">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl italic bold">
            PITBIKE<span className="font-thin">RS</span>
          </a>
        </Link>
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end px-3">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content shadow bg-base-100 rounded-box w-screen h-auto mx-0"
          >
            <Link href="/">
              <li>
                <a className="justify-center py-6 text-3xl">Home</a>
              </li>
            </Link>
            <Link href="/foro">
              <li>
                <a className="justify-center py-6 text-3xl">Foro</a>
              </li>
            </Link>
            {user ? (
              <>
                <Link href="/perfil">
                  <li>
                    <a className="justify-center py-6 text-3xl">Perfil</a>
                  </li>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="justify-center py-6 text-3xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <li>
                  <a className="justify-center py-6 text-3xl">Login</a>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <div className="hidden flex-none text-xl px-6 md:flex">
        <ul className="menu menu-horizontal p-0">
          <li className="mx-4">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/foro">
              <a>Foro</a>
            </Link>
          </li>
          {user ? null : (
            <>
              <li className="mx-4">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="mx-4">
                <Link href="/signup">
                  <a>Registrarse</a>
                </Link>
              </li>
            </>
          )}
        </ul>
        {user ? <UserDropDown /> : null}
      </div>
    </div>
  )
}

export default Navbar
