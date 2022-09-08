import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { selectSearchTerm } from "../search/searchSlice";
import { selectActiveFilters } from "../filters/filtersSlice";


 

// createAsyncThunk simplifies our Redux app by returning an action creator that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.
export const loadProjects = createAsyncThunk(
  "allProjects/getAllProjects",
  async () => {
    const data = await fetch('../db.json');
    
    const json = await data.json();
    
    return json;
  }
);

const sliceOptions = {
  name: "allProjects",
  initialState: {
    projects: [],
    isLoading: false,
    hasError: false
  },
  reducers: {},
  extraReducers: {
    [loadProjects.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadProjects.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
}

export const allProjectsSlice = createSlice(sliceOptions);

export const selectAllProjects = (state) => state.allProjects.projects;




export const selectFilteredAllProjects = (state) => {






  const allProjects = selectAllProjects(state);
  //const searchTerm = selectSearchTerm(state);
  
  const filters = selectActiveFilters(state);
  
  
  if (filters.length !== 0) {
    
    return (
      
      allProjects.filter(project => filters.every(filter => project[filter.key].includes(filter.value)))
      //use .every instead of some to deduct the filters (remember to add inactive filters-item in Filters.js) -> and remember to update inactive and dispatch new count before filters are applied
      //use .some instead of every to add the filters (remember to remove inactive filters-item in Filters.js) -> and don't update inactive + dispatch new count before filters are applied
      )
    } else {
      
      return allProjects
    }
  



     
};

export default allProjectsSlice.reducer;
