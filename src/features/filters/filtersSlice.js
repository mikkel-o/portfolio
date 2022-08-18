import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [],
  },
  reducers: {

    addFilter: (state, action) => {
      
      state.filters.push(
        action.payload
      );
    },
    removeFilter: (state, action) => {    
      // get index of object with id of 37
      const removeIndex = state.filters.findIndex( filter => filter.value === action.payload );
      // remove object
      state.filters.splice( removeIndex, 1 );



    },
    clearFilter: (state) => {state.filters = []},
  
  },


  
});

export const { addFilter, removeFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter.filters;

export default filterSlice.reducer;
