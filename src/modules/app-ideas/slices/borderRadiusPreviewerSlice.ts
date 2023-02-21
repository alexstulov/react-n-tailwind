import { createSlice } from "@reduxjs/toolkit";

export type borderRadiusPreviewerStateT = {
  topLeft: string,
  topRight: string,
  bottomLeft: string,
  bottomRight: string
}

export enum Corner {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight"
}

const borderRadiusPreviewerSlice = createSlice({
  name: "borderRadiusPreviewer",
  initialState: {
    [Corner.topLeft]: "10",
    [Corner.topRight]: "20",
    [Corner.bottomLeft]: "30",
    [Corner.bottomRight]: "40"
  },
  reducers: {
    setCorner: (state, action: {type: string, payload: {corner: Corner, value: string}}) => {
      const {corner, value} = action.payload
      state[corner] = value
    }
  }
})

export const {setCorner} = borderRadiusPreviewerSlice.actions

export default borderRadiusPreviewerSlice.reducer