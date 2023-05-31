import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPhotos = createAsyncThunk(
  "photos/getPhotos",
  async () => {
    const data = await fetch('../../../../db_photo.json');
    
    const json = await data.json();
    
    return json;
  }
);

const sliceOptions = {
  name: "photos",
  initialState: {
    all: [],
    isLoading: false,
    hasError: false,
    hasBeenSet: false,
    activeItem: []
  },
  reducers: {
    addActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
  extraReducers: {
    [loadPhotos.pending]: (state, action) => {
        console.log('r');
      state.isLoading = true;
      state.hasError = false;
      state.hasBeenSet = false;
    },
    [loadPhotos.fulfilled]: (state, action) => {
        console.log('ri');
      state.all = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.hasBeenSet = true;
    },
    [loadPhotos.rejected]: (state, action) => {
        console.log('ris');
      state.isLoading = false;
      state.hasError = true;
      state.hasBeenSet = false;
    },
  }
}

export const photoSlice = createSlice(sliceOptions);
//export const { getPhotoAlbum } = photoSlice.actions;

export const selectPhotos = (state) => state.photos.all;

export const { addActiveItem } = photoSlice.actions;

export default photoSlice.reducer;