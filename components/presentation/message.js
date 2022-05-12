import React, { useState, useEffect } from "react"
import { timestampToDate } from "../application/parseDates"
import useAuth from "../application/useAuth"
import { useThreats } from "../application/useThreats"
import { useRouter } from "next/router"
import { forumPermission } from "../application/usePermissions"

const Message = ({ user, text, date, color, tag, id, mainMessage }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [background, setBackground] = useState({
    color: "bg-white",
    opacity: "bg-opacity-25",
  })
  const userAuth = useAuth()
  const { deleteMessage } = useThreats()
  const router = useRouter()

  useEffect(() => {
    if (color) {
      setBackground({
        color: "bg-success",
        opacity: "bg-opacity-100",
      })
    }
    if (forumPermission(userAuth.user?.role)) {
      setIsAdmin(true)
    }
  }, [userAuth])

  const handleClick = async (e) => {
    e.preventDefault()
    const msg = {
      text,
      user,
      date,
    }
    await deleteMessage(msg, tag, id)
    router.reload()
  }

  return (
    <div className="my-16 max-w-xs m-auto md:max-w-4xl md:mx-10">
      <header
        className={`text-3xl font-bold ${background.color} ${background.opacity} py-2 pl-4 rounded-t-lg text-white flex justify-between items-center`}
      >
        {user}
        {isAdmin && !mainMessage && (
          <button
            className="btn btn-circle btn-error btn-md mr-4"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </header>
      <div className="bg-white bg-opacity-5 py-2 px-4 text-xl rounded-b-lg">
        <p className="mt-4">{text}</p>
        <div className="flex items-center justify-between mt-8">
          <p className="text-lg font-thin">{date}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
