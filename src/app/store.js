import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/projectsSlice";
import singleProjectReducer from "../features/singleProject/singleProjectSlice";
import photoReducer from "../features/photo/photoSlice";
import filtersReducer from "../features/filters/filtersSlice";
import toggleReducer from "../components/toggleSlice";


export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    photo: photoReducer,
    singleProject: singleProjectReducer,
    filters: filtersReducer,
    toggle: toggleReducer,
  
  },
  
});



