import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, selectAllProjects } from "../../features/allProjects/allProjectsSlice";
import AllProjects from "../../features/allProjects/AllProjects";
import FiltersMobile from "../../features/filters/FiltersMobile";
import { useSearchParams } from "react-router-dom";

//import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
//https://medium.com/@alex.pavlov/how-to-set-or-get-query-parameters-in-react-router-7d6e2440ede8

export default function Projects() {
  const dispatch = useDispatch();
  const allProjects = useSelector(selectAllProjects);
  //const allFilteredProjects = useSelector(selectFilteredAllProjects);
  
  
  
  const filtersTitles = ['role', 'technique', 'type', 'company']; 
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  let allFilteredProjects = [];

/*
    useEffect(() => {
  const obj = filters.flat().filter(project => arr.some(filter => project.value === filter));
    if (activeFilters.length !== 0) {
      obj.forEach(o => {
        console.log(o);
        dispatch(addActiveFilter(o));
      });
  }

  
  })
*/


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




  
  //const filters = selectActiveFilters(state);
  
  

  



     


  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filters"); // "1234"
  const queryFilters = filters ? filters.split(',') : [];

 
  const str = searchParams.get('filters');
  const arr = str ? str.split(',') : [];


  let fil = [];

  filtersTitles.forEach(filtersTitle => {
    
   const  a = [...new Set([].concat.apply([], allProjects.map((project) => project[filtersTitle]).flat().map((e) => e)))];
   
   
    fil.push(a.map(obj => (
      {
        key: filtersTitle, 
        value: obj, 
      }
    )));

    
  });

  const objs = fil.flat().filter(project => arr.some(filter => project.value === filter));
  
  /*
  objs.forEach(e => {

      dispatch(addActiveFilter(e));

    
  
  });*/
  

  //if (objs.length !== 0) {
    
    
      allFilteredProjects = allProjects.filter(project => objs.every(filter => project[filter.key].includes(filter.value)))
      //use .every instead of some to deduct the filters (remember to add inactive filters-item in Filters.js) -> and remember to update inactive and dispatch new count before filters are applied
      //use .some instead of every to add the filters (remember to remove inactive filters-item in Filters.js) -> and don't update inactive + dispatch new count before filters are applied
    

    //} else {
      //allFilteredProjects = allProjects;
    //}
  

  
  
  
  
  return (
    <div className={'wrapper'}>
      
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        <FiltersMobile items={allProjects} filters={objs} filteredItems={allFilteredProjects}/>
        </header>
        
        </header>
      
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
              
            <AllProjects projects={allFilteredProjects} params={queryFilters}/>

            </section>
          </>
        )}
      </main>
      
  </div> /* end */
  );
}



/*
 {isMobile ?
       
      : 
        <header className={'projects-header'} >
        <Filters filtersTitles={filtersTitles}/>
        </header>
      }


      <Link to="/projects?filters=Role+one">Test</Link>
        <Link to="/projects?filters=Type+one%2CRole+one">Test2</Link>
        <Link to="/projects/Project%20three?filters=Type+one%2CRole+one">Test3</Link>

      */