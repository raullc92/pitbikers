import React from "react"
import { genericData } from "../components/application/genericData"
import Searcher from "../components/presentation/searcher"
import TagCard from "../components/presentation/tagCard"

const Foro = () => {
  const tags = genericData.Tags

  return (
    <>
      <header
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(/vercel.svg)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md md:max-w-xl">
            <h1 className="mb-5 text-6xl tracking-wider font-bold italic md:text-7xl md:leading-[7rem]">
              FORO
            </h1>
          </div>
        </div>
      </header>

      <main>
        <section>
          <Searcher searchType="threat" />
        </section>

        <section className="">
          <h2 className="text-6xl text-center font-bold my-6">Tags</h2>
          {tags &&
            tags.map((tag, id) => (
              <TagCard
                title={tag.name}
                description={tag.description}
                key={id}
              />
            ))}
        </section>
      </main>
    </>
  )
}

export default Foro
