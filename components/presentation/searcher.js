import React, { useState } from "react"

const Searcher = () => {
  const [search, setSearch] = useState("")
  const [checks, setChecks] = useState({
    tag1: {
      isChecked: "",
      value: false,
    },
    tag2: {
      isChecked: "",
      value: false,
    },
  })

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
    console.log(e)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control flex max-w-xs m-auto md:max-w-lg">
        <input
          type="text"
          placeholder="Qué estás buscando?"
          className="input w-full my-4 max-w-xs m-auto bg-slate-600 opacity-50 text-white focus:outline-0 md:max-w-lg"
          value={search}
          onChange={handleChangeSearch}
        />
        <div className="md:flex">
          {Object.keys(checks).map((key) => (
            <label className="cursor-pointer label w-auto justify-start md:mr-8">
              <input
                key={key}
                value={key}
                type="checkbox"
                checked={key.isChecked}
                className="checkbox checkbox-accent mr-2"
                onChange={handleChangeChecks}
              />
              <span className="label-text">{key}</span>
            </label>
          ))}
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
