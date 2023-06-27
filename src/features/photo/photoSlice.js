import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const filterGroups = ['type', 'country'];
 
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
    active: [],
    featured: {
      id: 1,
      name: 'featured-photos',
      activeFilmIndex: 0,
      album: []
    },
    filters: {
      all: [],
      active: [],
      pseudo: [],
    },
    isLoading: false,
    hasError: false,
    hasBeenSet: false,
  },
  reducers: {
    setActiveFiltersPhoto: (state, action) => {
      if (action.payload === 'all') {
        state.filters.active = [];
        state.active = state.all;
      } else {
        const temp = state.filters.all.map(filter => filter.filters.flat()).flat();
      const objs = temp.filter(photo => action.payload.some(filter => photo.value === filter));
      state.filters.active = objs;
      state.active = 
        state.all.filter(photo => state.filters.active.every(filter => photo[filter.key].includes(filter.value)))
      }
    },
    setPseudoFiltersPhoto: (state, action) => {
      state.filters.pseudo = action.payload;
    },
    clearPseudoFiltersPhoto: (state) => {
      state.filters.pseudo = [];
    },
    addPseudoFilterPhoto: (state, action) => {
      state.filters.pseudo.push(action.payload);
    },
    removePseudoFilterPhoto: (state, action) => {
      
      const removeIndex =  state.filters.pseudo.findIndex( filter => filter.value === action.payload );
      state.filters.pseudo.splice( removeIndex, 1 );
      
    },
    updateFilterCountsPhoto: (state, action) => {
      //const all = state.filters.all.map((photo) => photo['filterGroup']).flat();
      
      let temp = [];
      
      state.filters.pseudo.forEach(x => {temp.push(x)});
      let pseudoCount = [];
      
      for (let i = 0; i < state.filters.all.length; i++) {
        pseudoCount.push([]);
        state.filters.all[i].filters.forEach((x, index) => {
          temp.push(x);
          pseudoCount[i].push(state.all.filter(photo => temp.every(filter => photo[filter.key].includes(filter.value))).length);
          
          x.countPseudo = pseudoCount[i][index];
          const removeIndex = temp.findIndex( filter => filter.value === x.value );
          temp.splice( removeIndex, 1 );
          
        });
      
      }

      
    },
    addActiveFilmIndexPhoto: (state, action) => {
      
      state.active.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      state.all.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      //state.all.forEach(photo => photo.activeFilm = action.payload)
    },
    addActiveSlideIndexPhoto: (state, action) => {
      
      state.featured.activeFilmIndex = action.payload.index;

      //state.all.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      //state.all.forEach(photo => photo.activeFilm = action.payload)
    }
  },
  extraReducers: {
    [loadPhotos.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.hasBeenSet = false;
    },
    [loadPhotos.fulfilled]: (state, action) => {
      state.all = action.payload;
      
      let temp = [];
    
      state.featured.album = state.all.filter(x => x.featured === true );
      state.featured.album.unshift(
        {
          id: 0,
          name: "cg-showreel",
          title: "Showreel",
          featuredRole: ["CG Generalist"],
          role: ["CG Generalist"],
          featured: true,
          hide: true,
          video: "/video/CGReel_temp.mp4",
          img: "/video/CGReel_temp_poster_540.jpg",
          link: "https://youtu.be/xKarEOxXa3s",
          embed: {
            host: "youtube",
            link: "https://www.youtube.com/embed/xKarEOxXa3s"
          }
        }
      );
      filterGroups.forEach((filterGroup, index) => {
        temp.push([{filterGroup: filterGroup, filters: {}}]);
        const all = action.payload.map((photo) => photo[filterGroup]).flat();
        temp[index][0].filters = [...new Set([].concat.apply([], all))].map(obj => (
          {
            key: filterGroup, 
            value: obj, 
            countTotal: all.filter(num => num === obj).length, 
            countActive: all.filter(num => num === obj).length, 
            countPseudo: all.filter(num => num === obj).length, 
          }
        ));
      });
      state.filters.all = temp.flat();
      state.hasBeenSet = true;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadPhotos.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.hasBeenSet = false;
    },
  }
}

export const photoSlice = createSlice(sliceOptions);

export const selectPhotos = (state) => state.photos.all;

export const selectFilteredPhotos = (state) => {
  if (state.filters.active.length !== 0) {
    return (
      state.photos.all.filter(photo => state.filters.active.every(filter => photo[filter.key].includes(filter.value)))
    )
  } else {
    return state.photos.all
  }
};

export const { setActiveFiltersPhoto, setPseudoFiltersPhoto, clearPseudoFiltersPhoto, addPseudoFilterPhoto, removePseudoFilterPhoto, updateFilterCountsPhoto, addActiveFilmIndexPhoto, addActiveSlideIndexPhoto } = photoSlice.actions;

export default photoSlice.reducer;