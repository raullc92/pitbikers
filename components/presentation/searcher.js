import React, { useState, useEffect } from "react"
import { genericData } from "../application/genericData"
import { useSearch } from "../application/useSearch"
import Link from "next/link"
import { ArticleCard } from "./articleCard"
import ThreatCard from "./threatCard"
import {
  orderThreatsByLikes,
  orderThreatsNewest,
  orderThreatsOldest,
} from "../application/orderFiles"

const Searcher = ({ searchType }) => {
  const [search, setSearch] = useState("")
  const [checks, setChecks] = useState({})
  const [searchedResults, setSearchedResults] = useState(null)

  const { searchArticles, searchThreats } = useSearch()

  useEffect(() => {
    let tags = {}
    genericData.articleTags.map((tag) => {
      tags = { ...tags, [tag]: { isChecked: "", value: false } }
    })
    setChecks(tags)
  }, [])

  const handleChangeChecks = (e) => {
    let name = e.target.value
    let newIsChecked
    checks[name].isChecked ? (newIsChecked = "") : (newIsChecked = "checked")
    let newChecks = {
      ...checks,
      [name]: {
        isChecked: newIsChecked,
        value: !checks[name].value,
      },
    }
    setChecks(newChecks)
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let tags = Object.keys(checks)
    let tagsChecked = tags.filter((tag) => checks[tag].value)
    if (!search && !tagsChecked.length) {
      return
    }
    let results = []
    if (searchType === "article") {
      results = await searchArticles(search, tagsChecked)
    }
    if (searchType === "threat") {
      results = await searchThreats(search, tagsChecked)
    }
    setSearchedResults(results)
  }

  const orderByLikes = () => {
    const orderedThreats = orderThreatsByLikes(searchedResults)
    setSearchedResults([...orderedThreats])
  }

  const orderByNewest = () => {
    const orderedThreats = orderThreatsNewest(searchedResults)
    setSearchedResults([...orderedThreats])
  }

  const orderByOldest = () => {
    const orderedThreats = orderThreatsOldest(searchedResults)
    setSearchedResults([...orderedThreats])
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="my-16">
        <div className="form-control flex max-w-xs m-auto md:max-w-xl">
          <input
            type="text"
            placeholder="Qué estás buscando?"
            className="input w-full my-4 max-w-xs m-auto bg-slate-600 opacity-50 text-white focus:outline-0 md:max-w-xl md:text-xl"
            value={search}
            onChange={handleChangeSearch}
          />
          <div className="md:flex md:max-w-xl flex-wrap gap-2">
            {checks &&
              Object.keys(checks).map((key, index) => {
                return (
                  <label
                    className="cursor-pointer label w-auto justify-start md:mr-8"
                    key={key}
                  >
                    <input
                      key={`${key}-${index}`}
                      value={key}
                      type="checkbox"
                      checked={key.isChecked}
                      className="checkbox checkbox-accent mr-2"
                      onChange={handleChangeChecks}
                    />
                    <span className="label-text md:text-xl">{key}</span>
                  </label>
                )
              })}
          </div>
          <input
            type="submit"
            value="Buscar"
            className="btn btn-primary px-20 flex max-w-xs m-auto mt-6 text-xl"
          />
        </div>
      </form>
      {searchType === "article" && (
        <section className="max-w-5xl m-auto mt-6">
          {searchedResults != null && (
            <>
              <h2 className="text-4xl text-center font-bold my-6">
                Artículos encontrados: {searchedResults.length}
              </h2>
              <div className="m-auto flex items-center gap-4 my-8 flex-wrap max-w-xs md:max-w-lg text-xl">
                <h3>Ordenar por:</h3>
                <button className="btn btn-success" onClick={orderByLikes}>
                  Likes
                </button>
                <button className="btn btn-info" onClick={orderByNewest}>
                  Más recientes
                </button>
                <button className="btn btn-warning" onClick={orderByOldest}>
                  Más antiguos
                </button>
              </div>
            </>
          )}
          <div className="my-24 grid grid-cols-1  gap-20  md:grid-cols-2  justify-items-center">
            {searchedResults != null &&
              searchedResults.map((article) => {
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
      )}
      {searchType === "threat" && searchedResults != null && (
        <section className="flex m-auto flex-col">
          <h2 className="text-4xl text-center font-bold my-6">
            Hilos encontrados: {searchedResults.length}
          </h2>
          <div className="m-auto flex items-center gap-4 my-8 flex-wrap max-w-xs md:max-w-lg text-xl">
            <h3>Ordenar por:</h3>
            <button className="btn btn-success" onClick={orderByLikes}>
              Likes
            </button>
            <button className="btn btn-info" onClick={orderByNewest}>
              Más recientes
            </button>
            <button className="btn btn-warning" onClick={orderByOldest}>
              Más antiguos
            </button>
          </div>
          <div className="m-auto">
            {searchedResults != null &&
              searchedResults.map((threat) => (
                <ThreatCard
                  key={threat.id}
                  title={threat.title}
                  user={threat.user}
                  description={threat.description}
                  date={threat.date}
                  likes={threat.likes}
                  id={threat.id}
                  tag={threat.tag}
                />
              ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Searcher
