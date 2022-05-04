import React from "react"
import useAuth from "../../application/useAuth"
import Link from "next/link"

const UserDropDown = () => {
  const { logout, user } = useAuth()
  const firstLetter = user?.name?.charAt(0).toUpperCase() ?? ""

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar placeholder"
      >
        <div className="w-10 rounded-full bg-primary text-neutral-content">
          {/* {user?.avatar ? (
            <img src={user.avatar} />
          ) : (
            <span>{user?.name?.slice(0, 1).toUpperCase()}</span>
          )} */}
          <span>{user?.name?.slice(0, 1).toUpperCase()}</span>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li>
          <Link href="/perfil">
            <a className="justify-center text-xl">Perfil</a>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="justify-center text-xl"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserDropDown
