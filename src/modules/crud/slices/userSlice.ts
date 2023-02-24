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
  order: string,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setLimit(state, action) {
      state.limit = action.payload
    },
    setSortNOrder(state, action) {
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
      .addCase(updateUser.fulfilled, (state, action) => {
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
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(createUser.rejected, (_, action) => {
        console.error(action.error.message)
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
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

export default userSlice.reducer