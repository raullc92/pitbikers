import Link from "next/link"
import React from "react"
import { genericData } from "../application/genericData"

const Footer = () => {
  return (
    <footer className="flex justify-evenly items-center">
      <ul className="flex flex-col">
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <Link href={"/foro"}>
          <a>Foro</a>
        </Link>
      </ul>
      <ul className="flex flex-col">
        {genericData.articleTags.map((tag) => (
          <Link href={`/foro/tag${tag}`} key={tag}>
            <a>{tag}</a>
          </Link>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
