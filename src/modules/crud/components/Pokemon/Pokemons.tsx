import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { dropTag, addTag, fetchTablePokemons, selectAllPokemons, selectAllTypesIds, selectTablePokemons, setSearchQuery, setRowsPerPage } from "../../slices/pokemonSlice"
import { setCurrentPage } from "../../slices/pokemonSlice"
import { AppDispatch, RootState } from "../../store"
import Pagination from "../Pagination"
import { Spinner } from "../Spinner"

let once = false
const Pokemons = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchQueryInput, setSearchQueryInput] = useState("")
  const [tag, setTag] = useState("")
  const allPokemons = useSelector(selectAllPokemons)
  const allTypesIds = useSelector(selectAllTypesIds)
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

  const handleDropTag = (tag: string) => dispatch(dropTag(tag))

  const handleAddTag = (tag: string) => {
    if (tag === "") {
      return
    }
    dispatch(addTag(tag))
    setTag("")
  }

  useEffect(() => {
    dispatch(fetchTablePokemons())
  }, [
    tablePokemons.currentPage,
    tablePokemons.searchQuery, 
    tablePokemons.tags,
    tablePokemons.limit
  ])

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
              <option value="">Select type</option>
              {allTypesIds.filter(type => !tablePokemons.tags.includes(type)).map(typeName => <option key={typeName} value={typeName}>{typeName}</option>)}
            </select>
            <button type="button" className="btn btn-secondary mr-2" onClick={() => handleAddTag(tag)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </label>
        </div>
        <div className="flex flex-row gap-x-1 mt-4 flex-wrap">
          {tablePokemons.tags.map(tag => (<div key={tag} className="badge p-3 mb-2">
            <span>#{tag}</span>
            <button onClick={() => handleDropTag(tag)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>))}
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
          <td>{pokemon.details?.img ? <img src={`data:image/jpeg;charset=utf-8;base64,${pokemon.details?.img}`} alt={pokemon.name} /> : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }</td>
          <td><Link to={pokemon.name}>{pokemon.name}</Link></td>
          <td>{pokemon.url}</td>
          <td>{pokemon.details?.weight}</td>
          <td>{pokemon.details?.height}</td>
          <td>{pokemon.details?.types.map((type) => <button key={type} className="badge mr-1" onClick={() => handleAddTag(type)}>#{type}</button>)}</td>
        </tr>)}
      </tbody>
    </table>
    <div className="flex flex-row justify-end mt-4">
      <Pagination
        pageSize={tablePokemons.limit}
        totalCount={tablePokemons.total}
        currentPage={tablePokemons.currentPage}
        onPageChange={(n: string | number) => dispatch(setCurrentPage(n))} 
        onRowsPerPageChange={rows => dispatch(setRowsPerPage(rows))}
      />
    </div>
  </div>
}

export default Pokemons