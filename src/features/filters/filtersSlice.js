import { createSlice } from "@reduxjs/toolkit";



export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    all: [],
    activeFilters: ['initial'],
    projectedCount: [],
    filterMethod: '',
  },
  reducers: {

    addAllFilters: (state, action) => {
      state.all = action.payload;
    },
    addActiveAllFilters: (state, action) => {
      state.activeFilters = action.payload;
        

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
    projectedCounts: (state, action) => {state.projectedCount = [action.payload]},
    toggleMethod: (state, action) => {
      state.filterMethod = action.payload;
    },
    
  },
  
});

export const { addActiveFilter, addActiveAllFilters,removeActiveFilter, clearActiveFilters, addAllFilters, projectedCounts, toggleMethod } = filtersSlice.actions;

export const selectActiveFilters = (state) => state.filters.activeFilters;

export const selectAllFilters = (state) => state.filters.all;

export default filtersSlice.reducer;
