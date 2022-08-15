import { configureStore } from "@reduxjs/toolkit";
import allProjectsReducer from "../features/allProjects/allProjectsSlice";
import searchReducer from "../features/search/searchSlice";
import filterReducer from "../features/filters/filtersSlice";

export default configureStore({
  reducer: {
    allProjects: allProjectsReducer,
    search: searchReducer,
    filter: filterReducer,
  },
});
