import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

const ComeBack = ({ forum }) => {
  const router = useRouter()

  const handleClick = () => {
    if (forum) {
      router.push("/foro")
    } else {
      router.back()
    }
  }

  return (
    <button
      className="flex items-center gap-8 m-auto my-10 "
      onClick={handleClick}
    >
      <Image src="/icons/back.svg" width={75} height={75} />
      <p className="text-2xl">Volver atrás</p>
    </button>
  )
}

export default ComeBack
