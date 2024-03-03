import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: ''
}
export const DataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {

    adddata: (state, action) => {
      state.data = action.payload
    },
    postdata: (state, action) => {
      state.data = action.payload
    }
  },
})

export const { adddata, postdata } = DataSlice.actions

export default DataSlice.reducer

