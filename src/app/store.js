import { configureStore } from "@reduxjs/toolkit";

/*import {replace} from 'react-router-redux';*/
import allProjectsReducer from "../features/allProjects/allProjectsSlice";
import singleProjectReducer from "../features/singleProject/singleProjectSlice";

import filterReducer from "../features/filters/filtersSlice";
import toggleReducer from "../components/toggleSlice";

//import primaryNavigationReducer from "../features/navigation/primaryNavigationSlice";

/*
// Paste the logger function here.
const logger = storeAPI => next => action => {
  
  console.log(storeAPI.getState());
  console.log(action);
  console.log(action.type === "allProjects/getAllProjects/fulfilled" ? action.payload : 'null');
  /*
  if (action.pushToUrl) {
    const state = storeAPI.getState();

    storeAPI.dispatch(replace({
      pathname: state.routing.locationBeforeTransitions.pathname,
      query: {
        ...state.routing.locationBeforeTransitions.query,
        ...action.pushToUrl
      }
    }));
  }
  */
  /*
  //console.log(storeAPI.getState());
  const nextState = next(action);
  //console.log(nextState);
  return nextState;
};
*/

export const store = configureStore({
  reducer: {
    allProjects: allProjectsReducer,
    singleProject: singleProjectReducer,
    filter: filterReducer,
    toggle: toggleReducer,
    //primaryNavigation: primaryNavigationReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



