import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
  },
  reducers: {

    toggle: (state, action) => {
      const toggleId = action.payload;
      state[toggleId] = !state[toggleId]; 
    },
    hideAllToggles: (state) => {
      Object.keys(state).forEach(v => state[v] = false)
    },
  
 },
  
});

export const { toggle, hideAllToggles } = toggleSlice.actions;

export const selectToggle = (state) => state.toggle;

export default toggleSlice.reducer;
