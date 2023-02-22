import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserT } from "./slices/userSlice"

const store = configureStore({
  reducer: {
    users: userReducer
  }
})

export type StateT = {
  users: UserT[]
}

export default store