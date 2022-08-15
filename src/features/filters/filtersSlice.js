import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => (state = action.payload),
    clearFilter: (state) => (state = ""),
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
