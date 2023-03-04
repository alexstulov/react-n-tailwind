import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchTablePokemons, selectAllPokemons, selectTablePokemons, setSearchQuery } from "../../slices/pokemonSlice"
import { setCurrentPage } from "../../slices/pokemonSlice"
import { AppDispatch, RootState } from "../../store"
import Pagination from "../Pagination"
import { Spinner } from "../Spinner"

let once = false
const Pokemons = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchQueryInput, setSearchQueryInput] = useState("")
  const [tag, setTag] = useState("normal")
  const allPokemons = useSelector(selectAllPokemons)
  const allPokemonsStatus = useSelector((state: RootState) => state.pokemons.allPokemons.status)
  const tablePokemons = useSelector(selectTablePokemons)

  useEffect(() => {
    if (allPokemonsStatus === "succeeded" && !once) {
      once = true
      dispatch(fetchTablePokemons())
    }
  }, [allPokemons])

  const submitHandler = () => {
    dispatch(setSearchQuery(searchQueryInput))
  }

  const addTag = (e: any) => {
    console.log("add tag", e.target.value)
  }

  useEffect(() => {
    dispatch(fetchTablePokemons())
  }, [tablePokemons.currentPage, tablePokemons.searchQuery])

  const columns = [
    {
      name: "Image", accessor: "image",
    },
    {
      name: "Name", accessor: "name",
    },
    {
      name: "Url", accessor: "url",
    },
    {
      name: "Weight", accessor: "weight",
    },
    {
      name: "Height", accessor: "height",
    },
    {
      name: "Types", accessor: "types",
    }
  ]

  if (tablePokemons.status === "loading" || allPokemonsStatus === "loading") {
    return <Spinner text="Loading..." />
  } else if (tablePokemons.status === "failed") {
    return <div>{tablePokemons.error.toString()}</div>
  }

  return <div className="overflow-x-auto p-4">
    <div className="flex flex-row justify-between mb-4 w-full">
      <div className="flex flex-col">
        <div className="form-control">
          <label className="input-group">
            <select className="select select-bordered select-info" name="tag" value={tag} onChange={e => setTag(e.target.value)}>
              <option value="normal">normal</option>
              <option value="fire">fire</option>
              <option value="water">water</option>
            </select>
            <button type="button" className="btn btn-secondary mr-2" onClick={addTag}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </label>
        </div>
        <div className="badge p-3 mt-4">
          <span>text</span>
          <button onClick={() => console.log("click")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          submitHandler()
        }}>
          <div className="form-control mb-2">
            <label className="input-group">
              <input className="input input-bordered input-info" type="text" name="search_query" value={searchQueryInput} onChange={e => setSearchQueryInput(e.target.value)} placeholder="Search..." />
              <button type="button" className="btn btn-secondary mr-2" onClick={submitHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          {columns.map(column => <th key={column.accessor}>{column.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {tablePokemons.data.map(pokemon => <tr key={pokemon.name}>
          <td><img src={pokemon.details?.sprites.front_default} alt={pokemon.name} /></td>
          <td><Link to={pokemon.name}>{pokemon.name}</Link></td>
          <td>{pokemon.url}</td>
          <td>{pokemon.details?.weight}</td>
          <td>{pokemon.details?.height}</td>
          <td>{pokemon.details?.types.map(typeWrapper => `#${typeWrapper.type.name}`).join(", ")}</td>
        </tr>)}
      </tbody>
    </table>
    <div className="flex flex-row justify-end mt-4">
      <Pagination
        pageSize={tablePokemons.limit}
        totalCount={tablePokemons.total}
        currentPage={tablePokemons.currentPage}
        onPageChange={(n: string | number) => dispatch(setCurrentPage(n))} />
    </div>
  </div>
}

export default Pokemons