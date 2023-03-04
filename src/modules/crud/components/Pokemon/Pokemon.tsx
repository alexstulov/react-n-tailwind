import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectPokemonById } from "../../slices/pokemonSlice"
import { RootState } from "../../store"

const Pokemon = () => {
  const {pokemonId} = useParams()
  const pokemon = useSelector((state: RootState) => selectPokemonById(state, pokemonId || ""))

  if (!pokemon) {
    return <>Pokemon not found!</>
  }
  return <div className='card bg-primary text-primary-content m-4 lg:w-1/4'>
    <div className="card-body">
      <div className="card-title">{pokemon.name}</div>
      <ul className="text-left">
        <li>Id: {pokemon.details?.id}</li>
        <li>Order: {pokemon.details?.order}</li>
        <li>Weight: {pokemon.details?.weight}</li>
        <li>Height: {pokemon.details?.height}</li>
      </ul>
      <div className="card-actions justify-end">
        <Link className="btn btn-secondary" to="/crud/pokemons/">Back</Link>
      </div>
    </div>
  </div>
}

export default Pokemon