import Link from "next/link"
import React from "react"

const Navbar = () => {
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
          <label tabindex="0" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabindex="0"
            className="menu dropdown-content shadow bg-base-100 rounded-box w-screen h-auto mx-0"
          >
            <li>
              <a className="justify-center my-3 py-4 text-3xl">Home</a>
            </li>
            <li>
              <a className="justify-center my-3 py-4 text-3xl">Forum</a>
            </li>
            <li>
              <a className="justify-center my-3 p-4 text-3xl">Login</a>
            </li>
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
            <Link href="/">
              <a>Forum</a>
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/">
              <a>Login</a>
            </Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabindex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabindex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <Link href="/">
                <a className="justify-center text-xl">Perfil</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="justify-center text-xl">Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
