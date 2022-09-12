import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isMobile:   window.innerWidth > 949 ? false : true,
    columnCount: 0,
  },
  reducers: {

    toggle: (state, action) => {

      if (action.payload === 'hideAll') {
        Object.keys(state).forEach(v => state[v] = false);
      } else {
        //console.log(action.payload);
      // initiate first toggle
      
      state[action.payload] = !state[action.payload]
      // hide others when current toggle activates
      Object.entries(state).forEach(([key]) => key === action.payload || state.isMobile ? state[key] : state[key] = false);
      
      }
      
        
        
      
    },
    hideToggle: (state, action) => { 
      //console.log(action.payload);
      Object.entries(state).find(([key]) => key === action.payload ? state[key] = false : state[key]);
    },
    hideAllToggles: (state, action) => {
      
      Object.keys(state).forEach(v => v.includes(action.payload) ? state[v] = false : state[v])
    },
    toggleMobile: (state, action) => {

      state.isMobile = action.payload;
      
      
    },
    columnCount: (state, action) => {
      //console.log(action.payload);
      state.columnCount = action.payload;
    }
 },
  
});

export const { toggle, hideToggle, hideAllToggles, toggleMobile, columnCount } = toggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default toggleSlice.reducer;
