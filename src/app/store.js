import { configureStore } from "@reduxjs/toolkit";
import allProjectsReducer from "../features/allProjects/allProjectsSlice";
import singleProjectReducer from "../features/singleProject/singleProjectSlice";
import searchReducer from "../features/search/searchSlice";
import filterReducer from "../features/filters/filtersSlice";
import toggleReducer from "../components/toggleSlice";
import primaryNavigationReducer from "../features/navigation/primaryNavigationSlice";

export default configureStore({
  reducer: {
    allProjects: allProjectsReducer,
    singleProject: singleProjectReducer,
    search: searchReducer,
    filter: filterReducer,
    toggle: toggleReducer,
    primaryNavigation: primaryNavigationReducer,
  },
});
