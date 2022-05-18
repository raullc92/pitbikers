import React from "react"
import Link from "next/link"

const TagCard = ({ title, description }) => {
  return (
    <Link href={`/foro/tag${title}`}>
      <div className="my-16 max-w-xs m-auto md:max-w-4xl md:mx-10 cursor-pointer">
        <header className=" text-3xl font-bold bg-primary py-2 pl-4 rounded-t-lg">
          {title}
        </header>
        <div
          className="bg-white bg-opacity-5 py-2 px-4 text-xl rounded-b-lg"
          style={{ whiteSpace: "pre-line" }}
        >
          {description}
        </div>
      </div>
    </Link>
  )
}

export default TagCard
