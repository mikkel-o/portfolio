import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
  },
  reducers: {

    toggle: (state, action) => {
      
      // initiate first toggle
      state[action.payload] = !state[action.payload]
      // hide others when current toggle activates
      Object.entries(state).forEach(([key]) => key === action.payload ? state[key] : state[key] = false);
      
        
        
      
    },
    hideAllToggles: (state) => {
      Object.keys(state).forEach(v => state[v] = false)
    },
  
 },
  
});

export const { toggle, hideAllToggles } = toggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default toggleSlice.reducer;
