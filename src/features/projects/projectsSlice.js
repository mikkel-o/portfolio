import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const filterGroups = ['role', 'technique', 'type', 'company'];
 
export const loadProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const data = await fetch('../db_projects.json');
    
    const json = await data.json();
    
    return json;
  }
);

const sliceOptions = {
  name: "projects",
  initialState: {
    all: [],
    active: [],
    featured: {
      id: 1,
      name: 'featured-projects',
      activeFilmIndex: 0,
      album: []
    },
    filters: {
      all: [],
      active: [],
      pseudo: [],
      method: 'AND',
    },
    isLoading: false,
    hasError: false,
    hasBeenSet: false,
  },
  reducers: {
    toggleMethod: (state, action) => {
      state.filters.method = action.payload;
    },
    setActiveFilters: (state, action) => {
      if (action.payload === 'all') {
        state.filters.active = [];
        state.active = state.all;
      } else {
        const temp = state.filters.all.map(filter => filter.filters.flat()).flat();
      const objs = temp.filter(project => action.payload.some(filter => project.value === filter));
      state.filters.active = objs;
      state.active = 
        state.all.filter(project => 
          state.filters.method === 'OR' && state.filters.active.length !== 0 ? 
            state.filters.active.some(filter => project[filter.key].includes(filter.value)) 

          : 
            state.filters.active.every(filter => project[filter.key].includes(filter.value))
          )
      }
    },
    setPseudoFilters: (state, action) => {
      state.filters.pseudo = action.payload;
    },
    clearPseudoFilters: (state) => {
      state.filters.pseudo = [];
    },
    addPseudoFilter: (state, action) => {
      state.filters.pseudo.push(action.payload);
    },
    removePseudoFilter: (state, action) => {
      
      const removeIndex =  state.filters.pseudo.findIndex( filter => filter.value === action.payload );
      state.filters.pseudo.splice( removeIndex, 1 );
      
    },
    updateFilterCounts: (state, action) => {
      //const all = state.filters.all.map((project) => project['filterGroup']).flat();
      
      let temp = [];
      
      state.filters.pseudo.forEach(x => {temp.push(x)});
      let pseudoCount = [];
      
      for (let i = 0; i < state.filters.all.length; i++) {
        pseudoCount.push([]);
        state.filters.all[i].filters.forEach((x, index) => {
          temp.push(x);
          state.filters.method === 'OR' ? pseudoCount[i].push(x.countTotal) : pseudoCount[i].push(state.all.filter(project => temp.every(filter => project[filter.key].includes(filter.value))).length);
          
          x.countPseudo = pseudoCount[i][index];
          const removeIndex = temp.findIndex( filter => filter.value === x.value );
          temp.splice( removeIndex, 1 );
          
        });
      
      }

      
    },
    addActiveFilmIndex: (state, action) => {
      
      state.active.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      state.all.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      //state.all.forEach(project => project.activeFilm = action.payload)
    },
    addActiveSlideIndex: (state, action) => {
      
      state.featured.activeFilmIndex = action.payload.index;

      //state.all.find(item => item.name === action.payload.name).activeFilmIndex = action.payload.index;
      //state.all.forEach(project => project.activeFilm = action.payload)
    }
  },
  extraReducers: {
    [loadProjects.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.hasBeenSet = false;
    },
    [loadProjects.fulfilled]: (state, action) => {
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
        const all = action.payload.map((project) => project[filterGroup]).flat();
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
    [loadProjects.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.hasBeenSet = false;
    },
  }
}

export const projectsSlice = createSlice(sliceOptions);

export const selectProjects = (state) => state.projects.all;

export const selectFilteredProjects = (state) => {
  if (state.filters.active.length !== 0) {
    return (
      state.projects.all.filter(project => state.filters.method === 'OR' && state.filters.active.length !== 0 ? state.filters.active.some(filter => project[filter.key].includes(filter.value)) : state.filters.active.every(filter => project[filter.key].includes(filter.value)))
    )
  } else {
    return state.projects.all
  }
};

export const { toggleMethod, setActiveFilters, setPseudoFilters, clearPseudoFilters, addPseudoFilter, removePseudoFilter, updateFilterCounts, addActiveFilmIndex, addActiveSlideIndex } = projectsSlice.actions;

export default projectsSlice.reducer;