import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, selectAllProjects, selectFilteredAllProjects } from "../../features/allProjects/allProjectsSlice";
import AllProjects from "../../features/allProjects/AllProjects";
import Filters from "../../features/filters/Filters";
import {
  clearFilter,
  removeFilter
} from "../../features/filters/filtersSlice";
import { hideAllToggles} from "../../components/toggleSlice";

export default function Projects() {
  const dispatch = useDispatch();
  const { hasError } = useSelector((state) => state.allProjects);
  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  const onTryAgainHandler = () => {
    dispatch(loadProjects());
  };
  const onClickClearHandler = (e) => {
    document.querySelectorAll('.filters .active').forEach(child => child.classList.remove('active'))
    dispatch(clearFilter());
    dispatch(hideAllToggles())
  };

  const allFilteredProjects = useSelector(selectFilteredAllProjects);
  const allProjects = useSelector(selectAllProjects);
  const filterNames = ['role', 'technique', 'type', 'company'];
  let filters = [];

  filterNames.forEach(filterName => {
    const allFiltered = allFilteredProjects.map(project => project[filterName]).flat();
    const all = allProjects.map((project) => project[filterName]).flat();
    const unique = [...new Set([].concat.apply([], all.map((e) => e)))];
    filters.push(unique.map(e => (
      {
        key: filterName, 
        value: e, 
        countTotal: all.filter(x => x===e).length, 
        countFilter: allFiltered.filter(x => x===e).length
      }
    )));
  });




  const useOutsideClick = (callback) => {
    const ref = useRef();
  
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  
    return ref;
  };
  
  
    const onClickHideToggle = (e) => { 
      dispatch(hideAllToggles())
      
    }
    
  
    const ref = useOutsideClick(onClickHideToggle);
  
    const currentFilters = useSelector(state => state.filter);



    const onClickChangeHandler = (e) => {

        dispatch(removeFilter(
          e.target.children[0].innerHTML
        ))  
      
  
    };


  return (
    <div className={''}>
      <header className={'projects-header'}>
        <div className={'filters-wrapper'} ref={ref}>
        {filterNames.map((filterName, index) => (
          <Filters key={index} filters={filters[index]} name={filterName}/>
        ))}
        <button onClick={onClickClearHandler}>
          Clear filters
        </button>
        </div>
        <ul className={'active-filters-list'}>
        {currentFilters.filters.map((filter, index) => (
          <li key={index} className={'active-filters-item'}>
            <button onClick={onClickChangeHandler} className={''}>
              <span className={'active-filter-name'}>{filter.value}</span>
            </button>
          </li>
        ))}
        </ul>
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
              <AllProjects />
            </section>
          </>
        )}
      </main>
  </div> /* end */
  );
}

