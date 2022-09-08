import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





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
    coord: [0, 0, 0, 0, 0],
    isLoading: false,
    hasError: false
  },
  reducers: {
    addProject: (state, action) => {
      
      state.projects = action.payload
    },
    clearProjects: (state) => {
      state.projects = []
    },
    projectCoord: (state, action) => {
      state.coord = action.payload;
    }
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

export const { addProject, clearProjects, projectCoord } = singleProjectSlice.actions;

export const selectProject = (state) => state.singleProject.projects;


export default singleProjectSlice.reducer;
