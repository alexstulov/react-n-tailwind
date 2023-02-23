import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type UserT = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  last_login: number
}

export type UserStateT = {
  data: UserT[],
  currentPage: number,
  limit: number,
  sort_by: "id" | "first_name" | "last_name" | "email" | "gender" | "last_login",
  order: string
}

export const emptyUser = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  last_login: 0
}

const initialState: UserStateT = {
  data: [],
  currentPage: 1,
  limit: 10,
  sort_by: "id",
  order: "asc"
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users/").then(data => data.json())
  return response
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setLimit(state, action) {
      state.limit = action.payload
    },
    setSortNOrder(state, action) {
      console.log(action)
      return {
        ...state,
        sort_by: action.payload.sort_by,
        order: action.payload.order
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    })
  }
})

export const {setCurrentPage, setSortNOrder} = userSlice.actions

export default userSlice.reducer