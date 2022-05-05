import React, { useState, useEffect } from "react"
import { timestampToDate } from "../application/parseDates"

const Message = ({ user, text, date, color }) => {
  const [parseDate, setParseDate] = useState(null)
  const [background, setBackground] = useState({
    color: "bg-white",
    opacity: "bg-opacity-25",
  })

  useEffect(() => {
    if (date) {
      setParseDate(timestampToDate(date))
    }
    if (color) {
      setBackground({
        color: "bg-success",
        opacity: "bg-opacity-100",
      })
    }
  }, [])
  return (
    <div className="my-16 max-w-xs m-auto md:max-w-4xl md:mx-10">
      <header
        className={`text-3xl font-bold ${background.color} ${background.opacity} py-2 pl-4 rounded-t-lg text-white`}
      >
        {user}
      </header>
      <div className="bg-white bg-opacity-5 py-2 px-4 text-xl rounded-b-lg">
        <p className="mt-4">{text}</p>
        <div className="flex items-center justify-between mt-8">
          <p className="text-lg font-thin">{parseDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
