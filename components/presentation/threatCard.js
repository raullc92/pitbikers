import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Timestamp } from "firebase/firestore"
import { timestampToDate } from "../application/parseDates"
import Link from "next/link"

const ThreatCard = ({ title, description, user, date, likes, id, tag }) => {
  const [parseDate, setParseDate] = useState(null)

  useEffect(() => {
    if (date) {
      setParseDate(timestampToDate(date))
    }
  }, [])

  return (
    <Link href={`/foro/hilo/${tag}-${id}`}>
      <div className="my-16 max-w-xs m-auto md:max-w-4xl md:mx-10 cursor-pointer">
        <header className="text-3xl font-bold bg-accent py-2 pl-4 rounded-t-lg">
          {title}
        </header>
        <div className="bg-white bg-opacity-5 py-2 px-4 text-xl rounded-b-lg">
          <p className="text-2xl font-bold py-3 text-white">{user}</p>
          <p>{description}</p>
          <div className="flex items-center justify-between mt-8">
            <p className="text-lg font-thin">{parseDate}</p>
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
