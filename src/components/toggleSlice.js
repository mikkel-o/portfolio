import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isMobile:   window.innerWidth > 949 ? false : true,
    layout: 0,
    columnCount: 
      window.innerWidth > 1349 ? 
        4 : window.innerWidth > 949 ? 
          3 : window.innerWidth > 599 
            ? 2 : 
              1
    
     
  },
  reducers: {

    toggle: (state, action) => {

      if (action.payload === 'hideAll') {
        Object.keys(state).forEach(v => state[v] = false);
      } else {

      // initiate first toggle
      
      state[action.payload] = !state[action.payload]
      // hide others when current toggle activates
      Object.entries(state).forEach(([key]) => key === action.payload || state.isMobile ? state[key] : state[key] = false);
      
      }
      
        
        
      
    },
    hideToggle: (state, action) => { 
      
      Object.entries(state).find(([key]) => key === action.payload ? state[key] = false : state[key]);
    },
    hideAllToggles: (state, action) => {
      
      Object.keys(state).forEach(v => v.includes(action.payload) ? state[v] = false : state[v])
    },
    toggleMobile: (state, action) => {

      state.isMobile = action.payload;
      
      
    },
    layout: (state, action) => {
      
      state.layout = action.payload;
    },
    columnCount: (state, action) => {
      
      state.columnCount = action.payload;
    }
 },
  
});

export const { toggle, hideToggle, hideAllToggles, toggleMobile, columnCount, layout } = toggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default toggleSlice.reducer;
