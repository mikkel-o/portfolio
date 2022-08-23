import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { selectSearchTerm } from "../search/searchSlice";
import { selectFilter } from "../filters/filtersSlice";





// createAsyncThunk simplifies our Redux app by returning an action creator that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.
export const loadProject = createAsyncThunk(
  "singleProject/getProject",
  async (projectName) => {
    const data = await fetch('../db.json');
    const json = await data.json();
    const single = json.find(
        
      (single) => single.name === projectName
    );


    return single;
  }
);

const sliceOptions = {
  name: "singleProject",
  initialState: {
    projects: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    addProject: (state, action) => {
      
      state.projects = action.payload
    },
    clearProjects: (state) => {state.projects = []},
  },
  extraReducers: {
    [loadProject.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadProject.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadProject.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
}

export const singleProjectSlice = createSlice(sliceOptions);

export const { addProject, clearProjects } = singleProjectSlice.actions;

export const selectProject = (state) => state.singleProject.projects;


export default singleProjectSlice.reducer;
