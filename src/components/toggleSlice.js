import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
  },
  reducers: {

    toggle: (state, action) => {

      if (action.payload === 'hideAll') {
        Object.keys(state).forEach(v => state[v] = false);
      } else {
        console.log(action.payload);
      // initiate first toggle
      state[action.payload] = !state[action.payload]
      // hide others when current toggle activates
      Object.entries(state).forEach(([key]) => key === action.payload ? state[key] : state[key] = false);
      
      }
      
        
        
      
    },
    hideToggle: (state, action) => { 
      console.log(action.payload);
      Object.entries(state).find(([key]) => key === action.payload ? state[key] = false : state[key]);
    },
    hideAllToggles: (state, action) => {
      
      Object.keys(state).forEach(v => v.includes(action.payload) ? state[v] = false : state[v])
    },
  
 },
  
});

export const { toggle, hideToggle, hideAllToggles } = toggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default toggleSlice.reducer;
