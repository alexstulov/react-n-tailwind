import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import { Buffer } from "buffer"

interface PokemonWrapperT {
  pokemon: PokemonT,
  slot: number
}
interface PokemonTypeDetailsT {
  name: string,
  pokemon: PokemonWrapperT[]
}

interface PokemonTypeT {
  name: string,
  url: string,
  details: PokemonTypeDetailsT | null
}

interface PokemonStateT {
    allPokemons: {
      data: PokemonT[],
      status: "idle" | "loading" | "succeeded" | "failed",
      error: string
    },
    tablePokemons: {
      data: PokemonT[],
      currentPage: number,
      limit: number,
      searchQuery: string,
      tags: string[],
      total: number,
      status: "idle" | "loading" | "succeeded" | "failed",
      error: string
    },
    allTypes: PokemonTypeT[]
}


interface TypeWrapperT {
    slot: number,
    type: {
      name: string,
      url: string
    }
  }
interface PokemonDetailsT {
  name: string,
  height: number,
  weight: number,
  id: number,
  order: number,
  img: string,
  types: string[]
}

interface PokemonT {
    name: string;
    url: string;
    details: PokemonDetailsT | null
}

const initialState: PokemonStateT = {
  allPokemons: {
    data: [],
    status: "idle",
    error: ""
  },
  tablePokemons: {
    data: [],
    limit: 10,
    currentPage: 1,
    status: "idle",
    searchQuery: "",
    tags: [],
    total: 0,
    error: ""
  },
  allTypes: []
}

export const emptyPokemon: PokemonT = {
  name: "",
  url: "",
  details: null
}

const basePath = "https://pokeapi.co/api/v2"

export const fetchTablePokemons = createAsyncThunk("pokemons/fetchTablePokemons", async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const {allPokemons, tablePokemons, allTypes} = state.pokemons

  let searchedPokemons = allPokemons.data
    .filter(pokemon => pokemon.name.toLocaleLowerCase().includes(tablePokemons.searchQuery))
  if (tablePokemons.tags.length) {
    let taggedPokemons = allTypes.filter(type => tablePokemons.tags.includes(type.name)).map(type => type.details?.pokemon).flat().map(pokemonWrapper => pokemonWrapper?.pokemon.name)
    taggedPokemons = [...new Set(taggedPokemons)]
    searchedPokemons = searchedPokemons.filter(sPokemon => taggedPokemons.includes(sPokemon.name))
  }
  const pagedPokemons = searchedPokemons
    .slice((tablePokemons.currentPage-1) * tablePokemons.limit, tablePokemons.currentPage * tablePokemons.limit)
  const initialValue: {pokemonsToFetch: PokemonT[], pokemonsToGo: PokemonT[]} = {pokemonsToFetch: [], pokemonsToGo: []}
  const {pokemonsToFetch, pokemonsToGo} = 
    pagedPokemons.reduce((accum, pokemon) => {
      if (pokemon.details === null) {
        return {
          ...accum,
          pokemonsToFetch: [
            ...accum.pokemonsToFetch,
            pokemon
          ]
        }
      }
      return {
        ...accum,
        pokemonsToGo: [
          ...accum.pokemonsToGo,
          pokemon
        ]
      }
    }, initialValue)

  if (pokemonsToFetch.length) {
    let fetchedPokemons: PokemonT[] = [...pokemonsToFetch]
    await Promise.all(
      pokemonsToFetch.map(async (pokemon: PokemonT) => await axios.get(`${basePath}/pokemon/${pokemon.name}`)))
      .then(pokemonDetailsList => {
        return Promise.all(pokemonsToFetch.map(async pokemon => {
          const dtls = pokemonDetailsList.find(pokemonDetails => pokemon.name === pokemonDetails.data.name)?.data || null
          const imgUrl = dtls.sprites.front_default
          const img = await axios.get(imgUrl, {responseType: "arraybuffer"})
            .then(response => Buffer.from(response.data, "binary").toString("base64"))
          return {
            ...pokemon,
            details: {
              ...dtls,
              types: dtls.types.map((typeWrapper: TypeWrapperT) => typeWrapper.type.name),
              img
            }
          }
        }))
      })
      .then((fPokemons: PokemonT[]) => {
        fetchedPokemons = fPokemons        
      })
    
    return {
      pokemonsToGo,
      fetchedPokemons,
      total: searchedPokemons.length
    }
  }
  
  return {
    pokemonsToGo,
    fetchedPokemons: [],
    total: searchedPokemons.length
  }
})

export const fetchAllPokemons = createAsyncThunk("pokemons/fetchAllPokemons", async () => {
  const response = await axios.get(`${basePath}/pokemon`).then(result => axios.get(`${basePath}/pokemon?offset=0&limit=${result.data.count}`))
  return response.data.results
})

export const fetchAllPokemonTypes = createAsyncThunk("pokemons/fetchTypes", async () => {
  const response = await axios.get(`${basePath}/type`)
  let typesList = [...response.data.results]
  await Promise.all(
    response.data.results
      .map(async (type: PokemonTypeT) => await axios.get(`${basePath}/type/${type.name}`))
  ).then(typeDetailsList => {
    typesList = typesList.map(type => {
      return {
        ...type,
        details: typeDetailsList.find(typeDetails => type.name === typeDetails.data.name)?.data || null
      }
    })
  })
  return typesList
})

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<string | number>) {
      state.tablePokemons.currentPage = parseInt(action.payload.toString())
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.tablePokemons.searchQuery = action.payload
    },
    addTag(state, action: PayloadAction<string>) {
      const {tags} = state.tablePokemons
      state.tablePokemons.tags = [...new Set([...tags, action.payload])]
    },
    dropTag(state, action: PayloadAction<string>) {
      const {tags} = state.tablePokemons
      tags.splice(tags.findIndex(tag => tag === action.payload), 1)
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.tablePokemons.limit = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchAllPokemons.fulfilled, (state, action: PayloadAction<PokemonT[]>) => {
      return {
        ...state,
        allPokemons: {
          ...state.allPokemons,
          data: action.payload.map(pokemon => ({
            ...pokemon,
            details: pokemon.details || null
          })),
          status: "succeeded",
        },
      }
    }),
    builder.addCase(fetchAllPokemons.pending, state => {
      state.allPokemons.status = "loading"
    }),
    builder.addCase(fetchAllPokemons.rejected, (state, action) => {
      state.allPokemons.status = "failed"
      state.allPokemons.error = action.error.message || ""
    }),
    builder.addCase(fetchTablePokemons.fulfilled, (state, action: PayloadAction<{
      pokemonsToGo: PokemonT[],
      fetchedPokemons: PokemonT[],
      total: number
    }>) => {
      const {pokemonsToGo,fetchedPokemons,total} = action.payload
      const cache = {...state.allPokemons}

      fetchedPokemons.forEach(fPokemon => {
        const index = cache.data.findIndex(aPokemon => aPokemon.name === fPokemon.name)
        if (index > -1) {
          cache.data[index] = fPokemon
        }
      })

      state.tablePokemons = {
        ...state.tablePokemons,
        data: [
          ...pokemonsToGo,
          ...fetchedPokemons
        ],
        total: total,
        status: "succeeded",
      }
    }),
    builder.addCase(fetchTablePokemons.pending, state => {
      state.tablePokemons.status = "loading"
    }),
    builder.addCase(fetchTablePokemons.rejected, (state, action) => {
      state.tablePokemons.status = "failed"
      state.tablePokemons.error = action.error.message || ""
    }),
    builder.addCase(fetchAllPokemonTypes.fulfilled, (state, action: PayloadAction<PokemonTypeT[]>) => {
      return {
        ...state,
        allTypes: action.payload
      }
    })
  },
})

export const selectAllPokemons = (state: RootState) => state.pokemons.allPokemons.data
export const selectAllPokemonsLoaded = (state: RootState) => state.pokemons.allPokemons.status === "succeeded"
export const selectTablePokemons = (state: RootState) => state.pokemons.tablePokemons
export const selectPokemonById = (state: RootState, pokemonId: string) => state.pokemons.tablePokemons.data.find(pokemon => pokemon.name === pokemonId)
export const selectAllTypes = (state: RootState) => state.pokemons.allTypes
export const selectAllTypesIds = (state: RootState) => state.pokemons.allTypes.map(type => type.name)
export const {setCurrentPage, setSearchQuery, addTag, dropTag, setRowsPerPage} = pokemonSlice.actions

export default pokemonSlice.reducer