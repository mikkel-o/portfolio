import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {

    addFilter: (state, action) => {
      state.push(
        action.payload
      );
    },
    removeFilter: (state, action) => {        
      return state.filter(
        el => el.value !== action.payload
      ); 
    },
    clearFilter: (state) => state = [],
  
  },
  
});

export const { addFilter, removeFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
