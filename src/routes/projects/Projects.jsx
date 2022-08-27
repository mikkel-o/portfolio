import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, selectAllProjects } from "../../features/allProjects/allProjectsSlice";
import AllProjects from "../../features/allProjects/AllProjects";

import Filters from "../../features/filters/Filters";
import FiltersMobile from "../../features/filters/FiltersMobile";


function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}


/*- - - - - - -- - - - - - - - - - - - - - - - - - - - - - - -*\
|                        ANIMATION                             |
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Constants


// Variants



/*-  - - - - - -- - - - - - - - - - - - - - -  - - - - - - - -*\
|                         COMPONENT                            |
\*-  - - - - - - - - - - - - - - - - - - - - -  - - - - - - - */

export default function Projects() {


/*                       DECLARATIONS                         */
  
  // Redux store data calls

  const dispatch = useDispatch();
  const allProjects = useSelector(selectAllProjects);

  

  // Arrays

  

  

/*                           LOAD DATA                          */

  // The if() is to stop it from fetching the data after the initial 
  // page has loaded. Because the data is being fetched asynchronisly,
  // the components' initial data is empty and causes the component to
  // re-render everytime, even though the data is already in the store.
  
  useEffect(() => {
    if (allProjects.length === 0) {
        dispatch(loadProjects());
    }
  }, [dispatch, allProjects.length]);

  // Button on failure page
  
  const { hasError } = useSelector((state) => state.allProjects);
  const onTryAgainHandler = () => {
    dispatch(loadProjects());
  };






/*                             FILTERS                               */
const filtersTitles = ['role', 'technique', 'type', 'company']; 
/*let filters = [];
  
// Filters creation

filtersTitles.forEach(filtersTitle => {
  const allFiltered = allFilteredProjects.map(project => project[filtersTitle]).flat();
  const all = allProjects.map((project) => project[filtersTitle]).flat();
  const unique = [...new Set([].concat.apply([], all.map((e) => e)))];
  filters.push(unique.map(obj => (
    {
      key: filtersTitle, 
      value: obj, 
      countTotal: all.filter(num => num === obj).length, 
      countFilter: allFiltered.filter(num => num === obj).length
    }
  )));
  });*/

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 10)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
}
})

let isMobile;
if (dimensions.width > 799) {
  isMobile = false;
}
else {
  isMobile = true;
}
console.log(isMobile);


/*                          CONSOLE LOGs                              */




const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];



/*                               JSX                                  */

  return (
    <div className={''}>
      
      {isMobile ?
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
      <FiltersMobile filtersTitles={filtersTitles}/>
      </header>
      : 
      <header className={'projects-header'} >
       <Filters filtersTitles={filtersTitles}/>
       </header>
      }
      
      <main id="projects-wrapper">
        {hasError ? (
          <div id="error-wrapper">
            <h1>
              Oh no! There was a mess in the kitchen and we couldn't get the
              projects.
            </h1>
            <button onClick={onTryAgainHandler}>Try again</button>
          </div>
        ) : (
          <>
            <section className="projects-section">
              
            <AllProjects />

            </section>
          </>
        )}
      </main>
  </div> /* end */
  );
}




/*
          {
            filterTitles.map( (filtersTitle, index) => (
              <Filters
                key={index}
                filters={filters[index]}
                name={filtersTitle}
                allItems={allProjects}
                filteredItems={allFilteredProjects}
              />

              
            ) )
          }
          
*/