import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/"}),
  tagTypes: ["Post"], // check out more about tags invalidation https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
  endpoints: () => ({}) // endpoins may be declared here, but also in separate slice files
})