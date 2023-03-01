import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "../store";

export type UserT = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  last_login: number
}

export interface SortNOrder {
  sort_by: "id" | "first_name" | "last_name" | "email" | "gender" | "last_login",
  order: string,
}

export interface UserStateT extends SortNOrder {
  data: UserT[],
  currentPage: number,
  limit: number,
  status: "idle" | "loading" | "succeeded" | "failed",
  error: string
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
  order: "asc",
  status: "idle",
  error: ""
}
// default redux fetching way. you may replace fetch with axios or any other package to fetch data from server
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users/").then(data => data.json())
  return response
})

export const updateUser = createAsyncThunk("users/updateUser", async (payload: Partial<UserT>) => {
  const {id, ...rest} = payload
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      ...rest
    })
  }).then(data => data.json())
  return response
})

export const createUser = createAsyncThunk("/users/createUser", async (payload: Partial<UserT>) => {
  const response = await fetch("http://localhost:3001/users/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      ip_address: "",
      last_login: ""
    })
  }).then(data => data.json())
  return response
})

export const deleteUser = createAsyncThunk("/users/deleteUser", async (userId: number) => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: "DELETE"
  }).then(data => {
    return {
      ...data.json(),
      userId
    }
  })
  return response
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<string | number>) {
      state.currentPage = parseInt(action.payload.toString())
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setSortNOrder(state, action: PayloadAction<SortNOrder>) {
      return {
        ...state,
        sort_by: action.payload.sort_by,
        order: action.payload.order
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserT[]>) => {
      return {
        ...state,
        status: "succeeded",
        data: action.payload
      }
    })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || ""
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserT>) => {
        const newData = state.data.map(user => {
          if (user.id === action.payload.id) {
            return action.payload
          }
          return user
        })
        return {
          ...state,
          data: newData
        }
      })
      .addCase(updateUser.rejected, (_, action) => {
        console.error(action.error.message)
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<UserT>) => {
        state.data.push(action.payload)
      })
      .addCase(createUser.rejected, (_, action) => {
        console.error(action.error.message)
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{userId: number}>) => {
        console.log(action)
        const userI = state.data.findIndex(user => user.id === action.payload.userId)
        if (userI >= 0) {
          state.data.splice(userI, 1)
        }
      })
      .addCase(deleteUser.rejected, (_, action) => {
        console.error(action.error.message)
      })
  }
})

export const {setCurrentPage, setSortNOrder} = userSlice.actions

export const selectUser = (state:RootState, userId: number) => state.users.data.find((user) => user.id === userId)

export default userSlice.reducer