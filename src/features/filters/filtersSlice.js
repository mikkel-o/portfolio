import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    allFilters: [],
    activeFilters: [],
    projectedCount: [],
  },
  reducers: {
    addAllFilters: (state, action) => {
      state.allFilters = action.payload;
    },

    addActiveFilter: (state, action) => {
      if ((state.activeFilters.findIndex( filter => filter.value === action.payload.value )) === -1) {
      state.activeFilters.push(
        action.payload
      );
    }
    },

    removeActiveFilter: (state, action) => {    
      // get index of object with id of 37
      const removeIndex = state.activeFilters.findIndex( filter => filter.value === action.payload );
      // remove object
      state.activeFilters.splice( removeIndex, 1 );
    },

    clearActiveFilters: (state) => {state.activeFilters = []},
    projectedCounts: (state, action) => {state.projectedCount = action.payload},

  },


  
});

export const { addActiveFilter, removeActiveFilter, clearActiveFilters, addAllFilters, projectedCounts } = filterSlice.actions;

export const selectActiveFilters = (state) => state.filter.activeFilters;

export const selectAllFilters = (state) => state.filter.allFilters;

export default filterSlice.reducer;
