import React, { useState, useEffect } from "react"
import { genericData } from "../application/genericData"

const Searcher = () => {
  const [search, setSearch] = useState("")
  const [checks, setChecks] = useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault()
    let tags = Object.keys(checks)
    let tagsChecked = tags.filter((tag) => checks[tag].value)
    console.log(search, tagsChecked)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control flex max-w-xs m-auto md:max-w-xl">
        <input
          type="text"
          placeholder="Qué estás buscando?"
          className="input w-full my-4 max-w-xs m-auto bg-slate-600 opacity-50 text-white focus:outline-0 md:max-w-xl"
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
                  <span className="label-text">{key}</span>
                </label>
              )
            })}
        </div>
        <input
          type="submit"
          value="Buscar"
          className="btn btn-primary px-20 flex max-w-xs m-auto mt-6"
        />
      </div>
    </form>
  )
}

export default Searcher
