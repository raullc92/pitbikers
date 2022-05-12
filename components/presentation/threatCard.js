import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Timestamp } from "firebase/firestore"
import { timestampToDate } from "../application/parseDates"
import Link from "next/link"
import { useRouter } from "next/router"
import useAuth from "../application/useAuth"
import { useThreats } from "../application/useThreats"
import { forumPermission } from "../application/usePermissions"

const ThreatCard = ({ title, description, user, date, likes, id, tag }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const userAuth = useAuth()
  const router = useRouter()
  const { deleteThreat } = useThreats()

  useEffect(() => {
    if (forumPermission(userAuth.user?.role)) {
      setIsAdmin(true)
    }
  }, [userAuth])

  const handleClick = async (e) => {
    e.preventDefault()
    await deleteThreat(tag, id)
    router.reload()
  }

  return (
    <Link href={`/foro/hilo/${tag}-${id}`}>
      <div className="my-16 max-w-xs m-auto md:max-w-4xl md:mx-10 cursor-pointer">
        <header className="text-3xl font-bold bg-accent py-2 pl-4 rounded-t-lg flex justify-between items-center">
          {title}
          {isAdmin && (
            <button
              class="btn btn-circle btn-error btn-md mr-4"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </header>
        <div className="bg-white bg-opacity-5 py-2 px-4 text-xl rounded-b-lg">
          <p className="text-2xl font-bold py-3 text-white">{user}</p>
          <p>{description}</p>
          <div className="flex items-center justify-between mt-8">
            <p className="text-lg font-thin">{date}</p>
            <div className="card-actions justify-end my-1 px-4 text-success font-bold text-2xl items-center">
              {likes.count} <Image src="/icons/vs.png" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ThreatCard
