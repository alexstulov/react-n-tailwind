import { configureStore } from "@reduxjs/toolkit";
import borderRadiusPreviewerReducer, { borderRadiusPreviewerStateT } from "./slices/borderRadiusPreviewerSlice"

export default configureStore({
  reducer: {
    borderRadiusPreviewer: borderRadiusPreviewerReducer
  }
})

export type StateT = {
    borderRadiusPreviewer: borderRadiusPreviewerStateT
}