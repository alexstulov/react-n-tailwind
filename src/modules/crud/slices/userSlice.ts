import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type UserT = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  last_login: number
}

export const emptyUser = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  last_login: 0
}

const initialState: UserT[] = []

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users").then(data => data.json())
  return response
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload
    })
  }
})

export default userSlice.reducer