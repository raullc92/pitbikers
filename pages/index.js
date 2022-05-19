import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/presentation/navbar"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import { ArticleCard } from "../components/presentation/articleCard"
import Searcher from "../components/presentation/searcher"
import { useState, useEffect } from "react"
import { UseArticles } from "../components/application/useArticles"

export default function Home() {
  const tags = ["mecanica", "mantenimiento", "circuito", "tag4", "tag5"]
  const { getArticles } = UseArticles()
  const [articles, setArticles] = useState([])
  useEffect(() => {
    if (articles.length === 0) {
      getArticles().then((articles) => setArticles(articles))
    }
  }, [])

  return (
    <div className="bg-base-100">
      <Head>
        <title>PITBIKERS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(/images/hero_color.webp)`,
          }}
        >
          <div className=" bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-7xl font-bold italic md:text-9xl">
                PITBIKE<span className="font-thin">RS</span>
              </h1>
            </div>
          </div>
        </div>
      </main>
      <section>
        <Searcher searchType="article" />
      </section>
      <section className="max-w-5xl m-auto mt-32">
        <h2 className="text-6xl text-center font-bold my-6">Artículos</h2>
        <div className="my-24 grid grid-cols-1  gap-20  md:grid-cols-2  justify-items-center">
          {articles.map((article) => {
            let slug = article.title.replaceAll(" ", "-")
            return (
              <Link href={`/articulo/${slug}`} key={article.id}>
                <a>
                  <ArticleCard
                    title={article.title}
                    tags={article.tags}
                    description={article.description}
                    likes={article.likes.count}
                    date={article.date}
                    key={article.id}
                    image={article.url}
                  />
                </a>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
