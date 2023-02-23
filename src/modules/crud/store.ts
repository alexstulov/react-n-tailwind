import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateT } from "./slices/userSlice"

const store = configureStore({
  reducer: {
    users: userReducer
  }
})

export type StateT = {
  users: UserStateT
}

export default store