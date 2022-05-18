import Link from "next/link"
import React from "react"
import { genericData } from "../application/genericData"

const Footer = () => {
  return (
    <footer className="flex justify-evenly items-center bg-primary py-3 mt-8 text-xl">
      <ul className="flex flex-col">
        <li className="font-bold">Páginas</li>
        <Link href={"/"}>
          <a className="mb-1 hover:text-base-100">Home</a>
        </Link>
        <Link href={"/foro"}>
          <a className="mb-1 hover:text-base-100">Foro</a>
        </Link>
      </ul>
      <ul className="flex flex-col">
        <li className="font-bold">Tags</li>
        {genericData.articleTags.map((tag) => (
          <Link href={`/foro/tag${tag}`} key={`footer-${tag}`}>
            <a className="mb-1 hover:text-base-100">{tag}</a>
          </Link>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
