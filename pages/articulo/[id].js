import React, { useState, useEffect } from "react"
import Image from "next/image"
import { UseArticles } from "../../components/application/useArticles"
import useAuth from "../../components/application/useAuth"
import { useRouter } from "next/router"
import { genericData } from "../../components/application/genericData"
import { articlePermission } from "../../components/application/usePermissions"
import { timestampToDate } from "../../components/application/parseDates"

const Article = ({
  title,
  description,
  url,
  date,
  tags,
  likes,
  articleId,
  imageName,
}) => {
  const [likeFalse, setLikeFalse] = useState("")
  const { user } = useAuth()
  const { increaseVote, decreaseVote } = UseArticles()
  const router = useRouter()

  useEffect(() => {
    if (likes.users.includes(user?.uid)) {
      setLikeFalse("vs_pressed")
    } else {
      setLikeFalse("vs_press")
    }
  }, [user])

  const handleDelete = async () => {
    if (articlePermission(user?.role)) {
      await UseArticles().deleteArticle(articleId, user?.uid, imageName)
      router.push("/")
    }
  }

  const handleClick = async () => {
    if (likeFalse === "vs_pressed") {
      await decreaseVote(articleId, user?.uid)
      setLikeFalse("vs_press")
      likes.count--
    } else {
      await increaseVote(articleId, user?.uid)
      setLikeFalse("vs_pressed")
      likes.count++
    }
  }
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md md:max-w-xl">
            <h1 className="mb-5 text-6xl tracking-wider font-bold italic md:text-7xl md:leading-[7rem]">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex flex-col px-5 max-w-5xl m-auto">
        <header className="m-auto my-20 text-primary">
          {user && (
            <div className="mt-12 flex">
              <button className="btn h-auto p-0 mx-auto" onClick={handleClick}>
                <Image
                  src={`/icons/${likeFalse}.svg`}
                  width={100}
                  height={100}
                />
              </button>
            </div>
          )}
        </header>
        <section className=" bg-white bg-opacity-10 p-4 rounded-lg md:text-xl md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="my-6">
              {tags &&
                tags.map((tag, index) => (
                  <span
                    key={`${index}-${tag}`}
                    className={`badge badge-${genericData.badgeStyles[index]} px-6 py-4 m-2 text-xl font-bold`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="flex justify-center text-2xl md:text-5xl items-center">
              {likes.count}
              <Image
                src={"/icons/vs.png"}
                alt={`${likes.count} likes`}
                width={48}
                height={48}
                layout="fixed"
              />
            </div>
          </div>
          <p className="my-6">{date}</p>
          <p className="text-xl " style={{ whiteSpace: "pre-line" }}>
            {description}
          </p>
        </section>
        {articlePermission(user?.role) && (
          <div className="flex justify-center my-10">
            <button className="btn btn-error text-xl" onClick={handleDelete}>
              Eliminar Art??culo
            </button>
          </div>
        )}
      </main>
    </>
  )
}

export default Article

export async function getStaticPaths() {
  const articles = await UseArticles().getArticles()

  const paths = articles.map((article) => {
    let titleWithOutSpaces = article.title.replace(/ /g, "-")
    return {
      params: { id: titleWithOutSpaces },
    }
  })
  return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
  const title = params.id.replace(/-/g, " ")
  const article = await UseArticles().getArticleByName(title)

  return {
    props: {
      title: article.title,
      description: article.description,
      url: article?.url ?? null,
      imageName: article?.imageName ?? null,
      date: article?.date ?? null,
      tags: article?.tags ?? null,
      likes: article?.likes ?? null,
      articleId: article?.id,
    },
  }
}
