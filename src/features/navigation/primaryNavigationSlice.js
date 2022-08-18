import { createSlice } from "@reduxjs/toolkit";

export const primaryNavigationSlice = createSlice({
  name: "primaryNavigation",
  initialState: false,
  reducers: {

    toggleNavigation: (state) => state = !state
      
    },
    goBack: (state, action) => {        
      return state.filter(
        el => el.value !== action.payload
      ); 
    },

  
});

export const { toggleNavigation, goBack } = primaryNavigationSlice.actions;

export const selectPrimaryNavigation = (state) => state.primaryNavigation;

export default primaryNavigationSlice.reducer;